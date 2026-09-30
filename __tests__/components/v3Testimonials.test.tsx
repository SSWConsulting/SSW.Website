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

describe("V3Testimonials", () => {
  it("defaults to the portrait layout with the same case study CTA", () => {
    render(<V3Testimonials data={{ testimonials: slides }} />);

    expect(screen.getByAltText("Ada")).toBeTruthy();
    expect(screen.getByText("Read how Ada did it.")).toBeTruthy();
    expect(document.querySelectorAll("[data-cta]")).toHaveLength(1);
    expect(document.querySelector("[data-cta]")?.getAttribute("href")).toBe(
      "/clients/ada"
    );
  });

  it("swaps the portrait for the case study CTA in the case study layout", () => {
    render(
      <V3Testimonials data={{ layout: "caseStudy", testimonials: slides }} />
    );

    expect(screen.getByText("Read how Ada did it.")).toBeTruthy();
    expect(document.querySelector("[data-cta]")?.getAttribute("href")).toBe(
      "/clients/ada"
    );
    expect(document.querySelectorAll("[data-cta]")).toHaveLength(1);
    // The headshot moves into the attribution row, so it is shown only once.
    expect(screen.getAllByAltText("Ada")).toHaveLength(1);
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

  it("uses the same arrows in both layouts, wrapping around", () => {
    for (const layout of [undefined, "caseStudy"]) {
      const { unmount } = render(
        <V3Testimonials data={{ layout, testimonials: slides }} />
      );
      fireEvent.click(screen.getByLabelText("Previous testimonial"));
      expect(activeQuote()).toContain("Second quote");
      fireEvent.click(screen.getByLabelText("Next testimonial"));
      expect(activeQuote()).toContain("First quote");
      unmount();
    }
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
