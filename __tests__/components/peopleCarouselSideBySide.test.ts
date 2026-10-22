import { describe, expect, it } from "@jest/globals";
import { getSideBySideLayout } from "@/components/blocks/v3/peopleCarousel/sideBySideLayout";

// The "Side by side" People Carousel shows people two to a page. One or two
// people sit statically; three or more page through a carousel with one dot
// per page, and an odd count leaves the last person alone on the final page.
describe("getSideBySideLayout", () => {
  it("renders nothing when there are no people", () => {
    expect(getSideBySideLayout(0)).toEqual({ mode: "none" });
  });

  it("centres a lone person", () => {
    expect(getSideBySideLayout(1)).toEqual({ mode: "single" });
  });

  it("shows two people side by side without a carousel", () => {
    expect(getSideBySideLayout(2)).toEqual({ mode: "pair" });
  });

  it.each([
    [3, 2],
    [4, 2],
    [5, 3],
    [8, 4],
  ])("pages %i people into %i pages", (count, pages) => {
    expect(getSideBySideLayout(count)).toEqual({ mode: "paged", pages });
  });
});
