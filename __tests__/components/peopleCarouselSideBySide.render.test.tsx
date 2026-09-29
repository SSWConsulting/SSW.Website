import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";
import React from "react";
// jest.mock calls below are hoisted above this import by babel-jest
import { V3PeopleCarousel } from "@/components/blocks/v3/peopleCarousel/peopleCarousel";

// useInView needs IntersectionObserver, which jsdom doesn't implement.
jest.mock("framer-motion", () => ({ useInView: () => true }));
// tinacms ships ESM, which this jest setup doesn't transform.
jest.mock("tinacms/dist/react", () => ({ tinaField: () => undefined }));
// ButtonRow measures itself with ResizeObserver; buttons aren't under test.
jest.mock("@/components/blocksSubtemplates/buttonRow", () => () => null);
// Embla needs a real browser. Stand in plain elements that expose the options
// each carousel was given, so the tests can check paging config and dots.
jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ opts, autoplay, className, children }) => (
    <div
      data-carousel={JSON.stringify({ ...opts, autoplay })}
      className={className}
    >
      {children}
    </div>
  ),
  CarouselContent: ({ children }) => <div>{children}</div>,
  CarouselItem: ({ children, ...props }) => (
    <div data-slide="" {...props}>
      {children}
    </div>
  ),
  CarouselPickItem: ({ index }) => <button data-dot={index} />,
  // As on the first page of a finite carousel
  useCarousel: () => ({
    scrollPrev: () => {},
    scrollNext: () => {},
    canScrollPrev: false,
    canScrollNext: true,
    selectedIndex: 0,
  }),
}));

const person = (name: string) => ({ name, role: "Role" });
const people = (count: number) =>
  Array.from({ length: count }, (_, i) => person(`Person ${i + 1}`));

const renderBlock = (count: number, layout?: string) =>
  render(
    <V3PeopleCarousel
      data={{ heading: "Hosted by **Ulysses**", layout, people: people(count) }}
    />
  ).container;

// The desktop half of the side-by-side layout, and what shows below lg
const desktop = (c: HTMLElement) => c.querySelector(".hidden.lg\\:block");
const belowLg = (c: HTMLElement) =>
  c.querySelector(".lg\\:grid-cols-2 .lg\\:hidden");

describe("V3PeopleCarousel side by side", () => {
  it("centres a lone person at the width of a paired card", () => {
    const cells = desktop(renderBlock(1, "sideBySide")).querySelectorAll(
      ".col-span-2"
    );
    expect(cells).toHaveLength(1);
    expect(cells[0].className).toContain("col-start-2");
  });

  it("shows two people side by side without a carousel", () => {
    const d = desktop(renderBlock(2, "sideBySide"));
    expect(d.querySelectorAll(".col-span-2")).toHaveLength(2);
    expect(d.querySelector(".col-start-2")).toBeNull();
    expect(d.querySelector("[data-carousel]")).toBeNull();
  });

  it("pages 3+ people two at a time with one dot per page, no autoplay or loop", () => {
    const d = desktop(renderBlock(5, "sideBySide"));
    const opts = JSON.parse(
      d.querySelector("[data-carousel]").getAttribute("data-carousel")
    );
    expect(opts).toMatchObject({
      slidesToScroll: 2,
      containScroll: false,
      loop: false,
      autoplay: false,
    });
    expect(d.querySelectorAll("[data-slide]")).toHaveLength(5);
    expect(d.querySelectorAll("[data-dot]")).toHaveLength(3);
  });

  it("disables the arrow the carousel can't scroll towards", () => {
    const d = desktop(renderBlock(5, "sideBySide"));
    const button = (label: string) =>
      d.querySelector<HTMLButtonElement>(`button[aria-label="${label}"]`);
    expect(button("Previous").disabled).toBe(true);
    expect(button("Next").disabled).toBe(false);
  });

  it("uses the stacked layout's small-screen carousel below lg", () => {
    const slideClasses = (c: Element) =>
      [...c.querySelectorAll("[data-slide]")].map((s) => s.className);
    const stacked = renderBlock(3);
    const sideBySide = belowLg(renderBlock(3, "sideBySide"));
    const stackedSwipe = stacked.querySelector(".lg\\:hidden[data-carousel]");
    expect(slideClasses(sideBySide)).toEqual(slideClasses(stackedSwipe));
  });

  it("drops the heading a size so it fits the narrower column", () => {
    const h2 = (c: HTMLElement) => c.querySelector("h2").className;
    expect(h2(renderBlock(1))).toContain("lg:text-5xl");
    expect(h2(renderBlock(1, "sideBySide"))).not.toContain("lg:text-5xl");
  });
});
