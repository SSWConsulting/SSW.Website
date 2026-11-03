import { PROD_BASE_URL } from "@/components/util/constants";

export const cardShell = [
  // border-0.75, not `border`: borderWidth.DEFAULT is 3px in this repo, too
  // heavy for a card hairline.
  "unstyled group relative flex h-full flex-col overflow-hidden rounded-card border-0.75",
  "text-inherit no-underline transition-colors duration-300 motion-reduce:transition-none",
  // A ring, not an outline, matching sidebarNavItem: tailwind-merge treats a
  // bare `outline` and `outline-2` as one group and keeps only the last, so the
  // pair can never give both a solid style and a 2px width. A ring is a
  // box-shadow, and an element's own overflow-hidden does not clip it.
  // outline-none suppresses the UA :focus-visible ring, which would otherwise
  // paint its own blue outline on top of ours.
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
].join(" ");

// Bundled as one token, not two reorderable classes: twMerge only lets a
// later p-* override an earlier one for the side it overlaps, so pr-10 has
// to stay after p-6 or the extra right padding silently disappears.
export const brandCardPadding = "p-6 pr-10";

export const learnMoreChip = [
  "inline-flex items-center justify-center rounded-control px-4 py-2",
  "text-sm font-medium transition-all duration-300 motion-reduce:transition-none",
  "scale-100 group-hover:scale-105",
  "bg-foreground text-background",
  "self-start",
].join(" ");

// The row that closes every product card: destination on the left, arrow on
// the right. Colour comes from the call site, since brand cards sit on their
// own surface rather than the page background.
export const cardFooter = [
  "mt-auto flex items-center justify-between gap-3 border-t-0.75 pt-3",
].join(" ");

const tagChipBase = [
  "flex-none rounded border-0.75 px-2 py-1",
  "text-xs font-medium leading-none",
].join(" ");

export const productTagChip = `${tagChipBase} border-brand bg-brand-subtle text-foreground`;

export const tinaTagChip = `${tagChipBase} border-white/40 text-white`;

export const MAX_VISIBLE_TAGS = 2;

export const visibleTags = (tags?: string[]): string[] =>
  Array.from(
    new Set((tags ?? []).map((tag) => tag?.trim()).filter(Boolean))
  ).slice(0, MAX_VISIBLE_TAGS);

// `url` can be relative (SSW Rewards' own /products/rewards), hence the base.
// A page on this site gets no label: "ssw.com.au/products/rewards" tells the
// reader nothing they can't see from the card, and the arrow already says the
// card is a link. Only an off-site destination is worth naming.
export const destinationLabel = (url?: string): string => {
  if (!url) return "";
  try {
    const { hostname, pathname } = new URL(url, PROD_BASE_URL);
    const host = hostname.replace(/^www\./, "");
    const ownHost = new URL(PROD_BASE_URL).hostname.replace(/^www\./, "");
    if (host === ownHost) return "";
    return pathname === "/" ? host : `${host}${pathname}`;
  } catch {
    return "";
  }
};
