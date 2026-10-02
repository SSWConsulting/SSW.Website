import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
// jest.mock calls below are hoisted above this import by babel-jest
import { V3Testimonials } from "@/components/blocks/v3/testimonials/testimonials";

// Render motion elements as their plain tags, minus the animation props.
jest.mock("framer-motion", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require("react");
  const strip = (tag) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function Motion({ initial, animate, transition, ...props }) {
      return React.createElement(tag, props);
    };
  return {
    MotionConfig: ({ children }) => children,
    motion: new Proxy({}, { get: (_, tag) => strip(tag) }),
  };
});
// tinacms ships ESM, which this jest setup doesn't transform.
jest.mock("tinacms/dist/react", () => ({ tinaField: () => undefined }));
jest.mock(
  "@/components/layout/v2ComponentWrapper",
  () =>
    function Wrapper({ children }) {
      return <section>{children}</section>;
    }
);

const slides = [
  {
    quote: "First quote",
    authorName: "Ada",
    authorImage: "/ada.png",
    caseStudyUrl: "/clients/ada",
    caseStudyLabel: "Read how Ada did it.",
  },
  { quote: "Second quote", authorName: "Grace", authorImage: "/grace.png" },
];

const activeQuote = () =>
  // The visible slide is the one not hidden from assistive tech.
  document.querySelector("[aria-hidden='false'] > blockquote")?.textContent;

describe("V3Testimonials", () => {
  it("defaults to the portrait layout, with no case study", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);

    expect(screen.getByAltText("Ada")).toBeTruthy();
    // Case studies belong to the case study layout: a saved URL is ignored.
    expect(screen.queryByRole("link")).toBeNull();
    expect(screen.queryByText("See Case Study")).toBeNull();
    expect(screen.queryByText("Read how Ada did it.")).toBeNull();
  });

  it("hides the other slides from assistive tech and the tab order", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);
    const hidden = screen.getByText("“Second quote”");

    expect(hidden.closest("[aria-hidden='true']")).not.toBeNull();
    expect(hidden.closest("[inert]")).not.toBeNull();
  });

  it("wraps the arrows around in both directions", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);
    fireEvent.click(screen.getByLabelText("Previous testimonial"));
    expect(activeQuote()).toContain("Second quote");
    fireEvent.click(screen.getByLabelText("Next testimonial"));
    expect(activeQuote()).toContain("First quote");
  });

  it("changes slide on a sideways swipe, not a vertical scroll", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);
    // Touch events bubble up to the block, so the quote is a fine target.
    const block = document.querySelector("blockquote")!;
    const swipe = (dx: number, dy: number) => {
      fireEvent.touchStart(block, {
        touches: [{ clientX: 200, clientY: 200 }],
      });
      fireEvent.touchEnd(block, {
        changedTouches: [{ clientX: 200 + dx, clientY: 200 + dy }],
      });
    };

    swipe(-80, 10);
    expect(activeQuote()).toContain("Second quote");
    swipe(10, -200);
    expect(activeQuote()).toContain("Second quote");
    swipe(80, 0);
    expect(activeQuote()).toContain("First quote");
  });

  it("hides the arrows for a single testimonial and renders nothing when empty", () => {
    const { container, rerender } = render(
      <V3Testimonials data={{ testimonials: [slides[0]] }} />
    );
    expect(screen.queryByLabelText("Next testimonial")).toBeNull();

    rerender(<V3Testimonials data={{ testimonials: [] }} />);
    expect(container.innerHTML).toBe("");
  });
});

const caseStudies = [
  {
    quote: "They are on a **whole different level**.",
    authorName: "Thomas",
    authorTitle: "Founder, FPE",
    authorImage: "/thomas.png",
    companyLogo: "/fpe-logo.png",
    companyLogoAlt: "French Payroll Expert",
    caseStudyUrl: "/clients/fpe",
    caseStudyHeadline: "A chatbot that answers payroll questions",
    caseStudyTitle: "AI navigation for FPE",
    caseStudyLabel: "Discover how a chatbot transformed their service.",
    caseStudyImage: "/fpe.png",
    caseStudyImageAlt: "The FPE team",
  },
  {
    quote: "Beryl is the future of payroll.",
    authorName: "Tracy",
    authorTitle: "Director, APA",
    companyLogo: "/apa-logo.png",
    companyLogoAlt: "Australian Payroll Association",
    caseStudyUrl: "https://example.com/apa",
    caseStudyHeadline: "A trustworthy payroll agent",
    caseStudyLabel: "See how we built it.",
  },
];

const renderCaseStudies = (testimonials = caseStudies) =>
  render(<V3Testimonials data={{ layout: "caseStudy", testimonials }} />);

// Only the visible slide is exposed to assistive tech, so role queries (which
// skip aria-hidden content) see just that slide.
const cardLink = () => screen.queryByRole("link");
const headline = () => screen.queryByRole("heading", { level: 2 })?.textContent;

describe("V3Testimonials case study layout", () => {
  it("shows the slide's headline, quote and author", () => {
    renderCaseStudies();

    expect(headline()).toBe("A chatbot that answers payroll questions");
    const quote = screen.getByRole("blockquote");
    expect(quote.textContent).toBe("“They are on a whole different level.”");
    // The emphasis keeps its own element, so it can be shown in red.
    expect(within(quote).getByText("whole different level")).toBeTruthy();
    expect(screen.getByText("Thomas")).toBeTruthy();
    expect(screen.getByText("Founder, FPE")).toBeTruthy();
  });

  it("links the whole case study card to the case study, in a new tab", () => {
    renderCaseStudies();
    const link = cardLink()!;

    expect(link.getAttribute("href")).toBe("/clients/fpe");
    expect(link.getAttribute("target")).toBe("_blank");
    expect(within(link).getByText("AI navigation for FPE")).toBeTruthy();
    expect(
      within(link).getByText(
        "Discover how a chatbot transformed their service."
      )
    ).toBeTruthy();
    expect(within(link).getByAltText("The FPE team")).toBeTruthy();
    expect(within(link).getByAltText("French Payroll Expert")).toBeTruthy();
    expect(screen.queryByText("See Case Study")).toBeNull();
  });

  it("titles the card with the company name when it has no title", () => {
    renderCaseStudies();
    fireEvent.click(screen.getByLabelText("Next case study"));

    expect(
      within(cardLink()!).getByText("Australian Payroll Association")
    ).toBeTruthy();
  });

  it("shows a card without an image or logo when there's no photo", () => {
    renderCaseStudies();
    fireEvent.click(screen.getByLabelText("Next case study"));
    const link = cardLink()!;

    expect(link.getAttribute("href")).toBe("https://example.com/apa");
    expect(within(link).queryByRole("img")).toBeNull();
  });

  it("drops the card when a slide has no case study link", () => {
    renderCaseStudies([{ ...caseStudies[0], caseStudyUrl: undefined }]);

    expect(headline()).toBe("A chatbot that answers payroll questions");
    expect(cardLink()).toBeNull();
  });

  it("wraps the arrows around in both directions", () => {
    renderCaseStudies();

    fireEvent.click(screen.getByLabelText("Previous case study"));
    expect(headline()).toBe("A trustworthy payroll agent");
    fireEvent.click(screen.getByLabelText("Next case study"));
    expect(headline()).toBe("A chatbot that answers payroll questions");
  });

  it("jumps to a slide from its dot and marks it current", () => {
    renderCaseStudies();
    const dot = screen.getByLabelText(
      "Show case study 2: Australian Payroll Association"
    );
    expect(dot.getAttribute("aria-current")).toBe("false");

    fireEvent.click(dot);
    expect(headline()).toBe("A trustworthy payroll agent");
    expect(dot.getAttribute("aria-current")).toBe("true");
    expect(
      screen
        .getByLabelText("Show case study 1: French Payroll Expert")
        .getAttribute("aria-current")
    ).toBe("false");
  });

  it("changes slide on a sideways swipe, not a vertical scroll", () => {
    renderCaseStudies();
    const swipe = (dx: number, dy: number) => {
      // The visible quote; touch events bubble up to the block.
      const target = screen.getByRole("blockquote");
      fireEvent.touchStart(target, {
        touches: [{ clientX: 200, clientY: 200 }],
      });
      fireEvent.touchEnd(target, {
        changedTouches: [{ clientX: 200 + dx, clientY: 200 + dy }],
      });
    };

    swipe(-80, 10);
    expect(headline()).toBe("A trustworthy payroll agent");
    swipe(10, -200);
    expect(headline()).toBe("A trustworthy payroll agent");
    swipe(80, 0);
    expect(headline()).toBe("A chatbot that answers payroll questions");
  });

  it("hides the other slides from assistive tech and the tab order", () => {
    renderCaseStudies();
    const hidden = screen.getByText("A trustworthy payroll agent");

    expect(hidden.closest("[aria-hidden='true']")).not.toBeNull();
    expect(hidden.closest("[inert]")).not.toBeNull();
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });

  it("hides the dots and arrows for a single slide and renders nothing when empty", () => {
    const { container, rerender } = renderCaseStudies([caseStudies[0]]);
    expect(screen.queryByLabelText("Next case study")).toBeNull();
    expect(screen.queryByLabelText(/Show case study/)).toBeNull();

    rerender(
      <V3Testimonials data={{ layout: "caseStudy", testimonials: [] }} />
    );
    expect(container.innerHTML).toBe("");
  });
});
