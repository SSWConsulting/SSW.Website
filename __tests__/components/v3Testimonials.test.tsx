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
  it("defaults to the portrait layout with a case study text link", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);

    expect(screen.getByAltText("Ada")).toBeTruthy();
    expect(screen.getByText("See Case Study")).toBeTruthy();
    expect(screen.queryByText("Read how Ada did it.")).toBeNull();
  });

  it("keeps hidden slides' links out of the tab order", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);
    const link = () => screen.getByText("See Case Study").closest("a")!;
    expect(link().closest("[inert]")).toBeNull();

    // Ada's slide (the one with the link) is now hidden.
    fireEvent.click(screen.getByLabelText("Next testimonial"));
    expect(link().closest("[inert]")).not.toBeNull();
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
