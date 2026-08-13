// Shared chrome for the three kinds of card on /products (standard, TinaCMS,
// YakShaver). Kept in one place so the two brand cards read as members of the
// same family as the other nine: identical geometry, focus behaviour and
// timing, with the surface colours as the only thing each card sets itself.

// Every card is a single link, so the shell classes go on the <a>.
//
// Notes on specific choices:
// - border-0.75, not `border`: borderWidth.DEFAULT is 3px in this repo, which
//   is far too heavy for a card hairline (same reason as consultingCard).
// - Hover is colour-only — border and background change, nothing moves and no
//   shadow appears. This deliberately matches ConsultingCard
//   (components/consulting/consultingCard/consultingCard.tsx), which uses
//   `transition-colors duration-300` with no transform and no box-shadow, so
//   the two index pages feel like one system. An earlier revision lifted the
//   card 6px and deepened a shadow on hover; both were removed to match.
// - `transition-colors`, not `transition`: there is nothing but colour to
//   animate now, and limiting the property list avoids animating layout.
// - Focus uses `outline-*`, NOT `ring-*`. A Tailwind ring is a box-shadow, and
//   on these cards it did not paint: with the ring's custom properties set
//   correctly, the computed box-shadow still resolved to the transparent
//   preflight fallbacks, so the focus indicator was invisible (verified in a
//   browser — the pixels either side of a keyboard-focused card showed no ring
//   colour at all). `outline` is a separate CSS property and cannot be
//   suppressed that way. The buttons in the toolbar and on the TinaCMS card do
//   paint their rings, so those keep `ring-*`.
// - Deliberately NO `outline-2`: tailwind-merge folds a bare `outline` into the
//   outline-width group and drops it, leaving outline-style: none — a focus
//   indicator that silently doesn't render (verified with twMerge directly).
//   Omitting the width leaves the CSS default `medium` (~3px), which is a
//   perfectly good indicator, so the style class survives.
export const cardShell = [
  "unstyled group relative flex h-full flex-col overflow-hidden rounded-card border-0.75",
  "text-inherit no-underline transition-colors duration-300 motion-reduce:transition-none",
  "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand",
].join(" ");

// The label in each card's footer names where the link goes. Relative CMS URLs
// (e.g. SSW Rewards' "/products/rewards") are resolved against the SSW site so
// they report a real host instead of an empty string.
export const destinationLabel = (url?: string): string => {
  if (!url) return "";
  try {
    return new URL(url, "https://www.ssw.com.au").hostname.replace(
      /^www\./,
      ""
    );
  } catch {
    return "";
  }
};
