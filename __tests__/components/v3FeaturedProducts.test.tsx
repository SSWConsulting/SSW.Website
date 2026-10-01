import { describe, expect, it, jest } from "@jest/globals";
import { render, within } from "@testing-library/react";
import React from "react";
// jest.mock calls below are hoisted above this import by babel-jest
import { V3FeaturedProducts } from "@/components/blocks/v3/featuredProducts/featuredProducts";

// tinacms ships ESM, which this jest setup doesn't transform.
jest.mock("tinacms/dist/react", () => ({ tinaField: () => undefined }));
// ButtonRow measures itself with ResizeObserver; buttons aren't under test.
jest.mock("@/components/blocksSubtemplates/buttonRow", () => () => null);
jest.mock(
  "@/components/layout/v2ComponentWrapper",
  () =>
    function Wrapper({ children }) {
      return <section>{children}</section>;
    }
);
// Embla needs a real browser, so the phone carousel renders as plain elements.
jest.mock("@/components/ui/carousel", () => ({
  Carousel: ({ children }) => <div>{children}</div>,
  CarouselContent: ({ children }) => <div>{children}</div>,
  CarouselItem: ({ children }) => <div>{children}</div>,
  CarouselPickItem: () => <button />,
  useCarousel: () => ({ selectedIndex: 0 }),
}));

const project = {
  title: "AI Powered Navigation",
  description: "A chatbot for payroll questions.",
  link: "/company/clients/fpe",
  image: { imageSource: "/fpe.png", altText: "The FPE team" },
};

describe("V3FeaturedProducts case study cards", () => {
  // The case study testimonials reuse this card with a photo on top and a
  // client logo; by default it must still render the homepage way.
  it("renders the homepage card: text first, then the photo, no logo", () => {
    const { container } = render(
      <V3FeaturedProducts data={{ products: [project] }} />
    );
    // The card renders once for the phone carousel and once for the desktop row.
    const card = container.querySelector("a")!;

    expect(card.getAttribute("href")).toBe("/company/clients/fpe");
    expect(card.getAttribute("target")).toBeNull();
    const title = within(card).getByText("AI Powered Navigation");
    expect(
      within(card).getByText("A chatbot for payroll questions.")
    ).toBeTruthy();
    const images = within(card).getAllByRole("img");
    expect(images.map((img) => img.getAttribute("alt"))).toEqual([
      "The FPE team",
    ]);
    expect(
      title.compareDocumentPosition(images[0]) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
