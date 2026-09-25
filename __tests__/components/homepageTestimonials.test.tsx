import { afterEach, describe, expect, it, jest } from "@jest/globals";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import React from "react";

jest.mock("framer-motion", () => {
  const React = jest.requireActual<typeof import("react")>("react");
  const plain = (tag: string) =>
    function Plain({ children, initial, animate, transition, ...props }) {
      void initial;
      void animate;
      void transition;
      return React.createElement(tag, props, children);
    };
  return {
    MotionConfig: ({ children }) => children,
    motion: { div: plain("div"), span: plain("span"), a: plain("a") },
  };
});
jest.mock("@/components/layout/v2ComponentWrapper", () => ({
  __esModule: true,
  default: ({ children }) => <section>{children}</section>,
}));
jest.mock("@/components/util/container", () => ({
  Container: ({ children }) => <div>{children}</div>,
}));
jest.mock("@/components/button/rippleButtonV2", () => ({
  __esModule: true,
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));
jest.mock("tinacms/dist/react", () => ({ tinaField: () => undefined }));

/* eslint-disable @typescript-eslint/no-require-imports -- load after mocks */
const {
  V3Testimonials,
} = require("@/components/blocks/v3/testimonials/testimonials");
/* eslint-enable @typescript-eslint/no-require-imports */
const testimonials = [
  { quote: "First quote", authorName: "First author", caseStudyUrl: "/first" },
  {
    quote: "Second quote",
    authorName: "Second author",
    caseStudyUrl: "/second",
  },
];
const visibleQuote = () =>
  document.querySelector("blockquote[aria-hidden=false]")?.textContent;

afterEach(() => {
  cleanup();
  jest.useRealTimers();
});

describe("homepage testimonial presentation", () => {
  it("uses manual arrows, wraps both ways and never auto-advances", () => {
    jest.useFakeTimers();
    render(<V3Testimonials data={{ testimonials }} layout="quote" />);
    expect(screen.queryByLabelText(/Show testimonial/)).toBeNull();
    expect(screen.getByText("See Case Study")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", { name: "Previous testimonial" })
    );
    expect(visibleQuote()).toContain("Second quote");
    fireEvent.click(screen.getByRole("button", { name: "Next testimonial" }));
    expect(visibleQuote()).toContain("First quote");
    act(() => jest.advanceTimersByTime(24000));
    expect(visibleQuote()).toContain("First quote");
  });

  it("keeps a visible quote when the CMS shortens the list; hides unnecessary controls", () => {
    const { rerender, container } = render(
      <V3Testimonials data={{ testimonials }} layout="quote" />
    );
    fireEvent.click(screen.getByRole("button", { name: "Next testimonial" }));
    rerender(
      <V3Testimonials
        data={{ testimonials: testimonials.slice(0, 1) }}
        layout="quote"
      />
    );
    expect(visibleQuote()).toContain("First quote");
    expect(screen.queryByRole("button")).toBeNull();
    rerender(<V3Testimonials data={{ testimonials: [] }} layout="quote" />);
    expect(container.innerHTML).toBe("");
  });

  it("retains dots and autoplay for the default consulting presentation", () => {
    jest.useFakeTimers();
    window.matchMedia = jest.fn(() => ({
      matches: false,
    })) as unknown as typeof window.matchMedia;
    render(<V3Testimonials data={{ testimonials }} />);
    expect(
      screen.queryByRole("button", { name: "Next testimonial" })
    ).toBeNull();
    expect(
      screen.getByRole("button", { name: "Show testimonial 2: Second author" })
    ).toBeTruthy();
    expect(screen.getByText("Explore the case study")).toBeTruthy();
    act(() => jest.advanceTimersByTime(8000));
    expect(visibleQuote()).toContain("Second quote");
  });
});
