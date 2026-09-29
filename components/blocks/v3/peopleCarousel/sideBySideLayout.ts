// How many people share one page of the "Side by side" layout.
export const PEOPLE_PER_PAGE = 2;

export type SideBySideLayout =
  | { mode: "none" }
  | { mode: "single" }
  | { mode: "pair" }
  | { mode: "paged"; pages: number };

// One or two people fit the column, so they sit statically; more than that
// pages through a carousel, one dot per page (an odd count leaves the last
// person alone on the final page).
export function getSideBySideLayout(count: number): SideBySideLayout {
  if (count <= 0) return { mode: "none" };
  if (count === 1) return { mode: "single" };
  if (count <= PEOPLE_PER_PAGE) return { mode: "pair" };
  return { mode: "paged", pages: Math.ceil(count / PEOPLE_PER_PAGE) };
}
