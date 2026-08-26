// Shared chrome for the three kinds of card on /products (standard, TinaCMS,
// YakShaver).

export const cardShell = [
  // border-0.75, not `border`: borderWidth.DEFAULT is 3px in this repo, too
  // heavy for a card hairline.
  "unstyled group relative flex h-full flex-col overflow-hidden rounded-card border-0.75",
  "text-inherit no-underline transition-colors duration-300 motion-reduce:transition-none",
  // outline, not ring: a Tailwind ring is a box-shadow that didn't paint here.
  // Omit outline-2 too: twMerge folds a bare `outline` into the width group
  // and drops it, leaving outline-style: none (verified with twMerge directly).
  "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand",
].join(" ");

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

// Tags come from a Tina `list: true` string field: trim, drop blanks, dedupe,
// then cap.
export const visibleTags = (tags?: string[]): string[] =>
  Array.from(
    new Set((tags ?? []).map((tag) => tag?.trim()).filter(Boolean))
  ).slice(0, MAX_VISIBLE_TAGS);

// `url` can be relative (SSW Rewards' own /products/rewards), hence the base.
export const destinationLabel = (url?: string): string => {
  if (!url) return "";
  try {
    const { hostname, pathname } = new URL(url, "https://www.ssw.com.au");
    const host = hostname.replace(/^www\./, "");
    return pathname === "/" ? host : `${host}${pathname}`;
  } catch {
    return "";
  }
};
