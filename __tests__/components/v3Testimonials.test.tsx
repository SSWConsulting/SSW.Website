import { describe, expect, it, jest } from "@jest/globals";
import { fireEvent, render, screen } from "@testing-library/react";
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
jest.mock(
  "@/components/button/rippleButtonV2",
  () =>
    function RippleButton({ href, children }) {
      return (
        <a href={href} data-cta="">
          {children}
        </a>
      );
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
  document.querySelector("blockquote:not([aria-hidden='true'])")?.textContent;

const dotFor = (name: string) =>
  screen.getByRole("button", { name: new RegExp(`: ${name}$`) });

describe("V3Testimonials", () => {
  it("defaults to the portrait layout with a case study text link", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);

    expect(screen.getByAltText("Ada")).toBeTruthy();
    expect(screen.getByText("See Case Study")).toBeTruthy();
    expect(document.querySelector("[data-cta]")).toBeNull();
    expect(screen.queryByText("Read how Ada did it.")).toBeNull();
  });

  it("shows a case study card in the case study layout", () => {
    render(
      <V3Testimonials data={{ layout: "caseStudy", testimonials: slides }} />
    );

    expect(screen.getByText("Read how Ada did it.")).toBeTruthy();
    const cta = document.querySelector("[data-cta]");
    expect(cta?.getAttribute("href")).toBe("/clients/ada");
    expect(cta?.textContent).toContain("Read the case study");
    expect(screen.queryByText("See Case Study")).toBeNull();
    // The photo moves into the card, so it's shown once, not as a portrait too.
    expect(screen.getAllByAltText("Ada")).toHaveLength(1);
  });

  it("shows a plain card when the author has no headshot", () => {
    const noPhoto = slides.map((t) => ({ ...t, authorImage: undefined }));
    render(
      <V3Testimonials data={{ layout: "caseStudy", testimonials: noPhoto }} />
    );

    expect(screen.queryByAltText("Ada")).toBeNull();
    expect(screen.getByText("Read how Ada did it.")).toBeTruthy();
    expect(document.querySelector("[data-cta]")).toBeTruthy();
  });

  it("keeps the portrait on case study layout slides without a case study", () => {
    render(
      <V3Testimonials data={{ layout: "caseStudy", testimonials: slides }} />
    );
    fireEvent.click(screen.getByLabelText("Next testimonial"));

    expect(activeQuote()).toContain("Second quote");
    expect(screen.getByAltText("Grace")).toBeTruthy();
    expect(document.querySelector("[data-cta]")).toBeNull();
  });

  it("uses the same arrows and dots in both layouts", () => {
    for (const layout of [undefined, "caseStudy"]) {
      const { unmount } = render(
        <V3Testimonials data={{ layout, testimonials: slides }} />
      );
      fireEvent.click(screen.getByLabelText("Previous testimonial"));
      expect(activeQuote()).toContain("Second quote");
      fireEvent.click(screen.getByLabelText("Next testimonial"));
      expect(activeQuote()).toContain("First quote");

      fireEvent.click(dotFor("Grace"));
      expect(activeQuote()).toContain("Second quote");
      expect(dotFor("Grace").getAttribute("aria-current")).toBe("true");
      expect(dotFor("Ada").getAttribute("aria-current")).toBe("false");
      unmount();
    }
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

  it("hides the controls for a single testimonial and renders nothing when empty", () => {
    const { container, rerender } = render(
      <V3Testimonials data={{ testimonials: [slides[0]] }} />
    );
    expect(screen.queryByLabelText("Next testimonial")).toBeNull();
    expect(
      screen.queryByRole("button", { name: /Show testimonial/ })
    ).toBeNull();

    rerender(<V3Testimonials data={{ testimonials: [] }} />);
    expect(container.innerHTML).toBe("");
  });
});
