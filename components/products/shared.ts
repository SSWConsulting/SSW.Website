import { PROD_BASE_URL } from "@/components/util/constants";

export const cardShell = [
  // border-0.75, not `border`: borderWidth.DEFAULT is 3px in this repo, too
  // heavy for a card hairline.
  "unstyled group relative flex h-full flex-col overflow-hidden rounded-card border-0.75",
  "text-inherit no-underline transition-colors duration-300 motion-reduce:transition-none",
  // outline, not ring (a ring is a box-shadow, which didn't paint here), and
  // no outline-2: twMerge folds a bare `outline` into the width group and
  // drops it, leaving outline-style: none.
  "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand",
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
export const destinationLabel = (url?: string): string => {
  if (!url) return "";
  try {
    const { hostname, pathname } = new URL(url, PROD_BASE_URL);
    const host = hostname.replace(/^www\./, "");
    return pathname === "/" ? host : `${host}${pathname}`;
  } catch {
    return "";
  }
};
