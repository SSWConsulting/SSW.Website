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

// The "Learn More" call to action on the two brand cards, shared so the pair
// cannot drift apart.
//
// Both brand cards are their own always-`dark` token scope, which is what makes
// one set of classes correct on both: `bg-foreground` resolves to white and
// `text-background` to #171717 inside either of them, regardless of the page
// theme. So the chip is a white field with a near-black label on both — on the
// TinaCMS card that replaced a #c2360d orange label, which was the only thing
// the two chips did differently.
//
// `text-background` (#171717 @ 17.4:1 on white) rather than a pure #000: it is
// the same near-black the site uses for body copy everywhere else, and pure
// black next to it reads as a different, harder ink.
//
// Deliberately no group-hover colour swap on either card. The TinaCMS card's own
// field brightens on hover, so tinting the chip to match would dissolve it into
// the surface; the growth below is the gesture instead.
export const learnMoreChip = [
  "inline-flex items-center justify-center rounded-control px-4 py-2",
  // transition-all, not transition-colors: the hover gesture is a transform, and
  // a colour-only transition would snap it instead of easing it. scale-100
  // states the rest value explicitly so the interpolation has both ends.
  "text-sm font-medium transition-all duration-300 motion-reduce:transition-none",
  "scale-100 group-hover:scale-105",
  "bg-foreground text-background",
  // self-start: on the YakShaver card the gradient's bright stops sit on the
  // right-hand side, so the chip is pinned left rather than allowed to stretch.
  // Harmless on the TinaCMS card, whose footer row is identical and sized by
  // this chip alone.
  "self-start",
].join(" ");

// Capability tags, rendered as small chips under each product's description so
// the grid can be skimmed without reading every blurb.
//
// Sentence case at text-xs, NOT the uppercase text-xxs badge this started as
// (which borrowed ConsultingCard's "Popular" chip). Two reasons, and the second
// is the load-bearing one:
//
//  1. Readability. That chip is a single one-word status badge, where uppercase
//     plus tracking-wider reads as a label. These are two- and three-word
//     capability phrases, three to a card, and letter-spaced uppercase makes
//     them scan word by word instead of at a glance.
//  2. Width. Uppercase plus tracking-wider inflated the chips enough that all
//     eleven cards wrapped their three tags onto TWO rows at the 4-up tier.
//     Dropping both gets six of the eleven down to a single row (measured in a
//     browser at 1440px); the five that still wrap are the ones with a
//     two-word tag in them - SophieBot, SophieHub, CodeAuditor,
//     SmashingBarrier, SSW Rewards. Worth knowing before adding letter-spacing
//     or lengthening a tag, since either pushes cards back to two rows.
//
// `rounded` (0.25rem, 4.5px at this root scale) rather than the pill it was: at
// this larger type a full pill read as a button. It is deliberately TIGHTER than
// the Learn More chip's rounded-control (0.375rem) — an intermediate revision
// matched that token so every chip on the page shared one radius, but a tag is
// not a button and reads better squarer than the thing you actually click. This
// is Tailwind's own scale rather than a design token because `control` is the
// smallest radius token the theme defines, so there is nothing between it and
// square to reach for.
//
// Applied as a bare string rather than through cn(). That used to be mandatory —
// `text-xxs` is a custom font-size key that tailwind-merge does not recognise, so
// it was silently dropped as a conflict with the text-colour class beside it.
// `text-xs` is a standard key and survives, so the whole of both variants below
// now passes through twMerge untouched (verified directly). The bare string is
// kept anyway: it costs nothing, and it means reaching for a custom scale key
// here again cannot quietly reintroduce that bug.
const tagChipBase = [
  "flex-none rounded border-0.75 px-2 py-1",
  "text-xs font-medium leading-none",
].join(" ");

// Standard cards, and the YakShaver card. Theme-aware on the nine standard
// cards; inside the YakShaver card's `dark` scope every token resolves to its
// dark value, which is exactly what that surface needs.
//
// The stroke is the brand red (#cc4141), which is what makes these pills read as
// pills at all: the neutral `border-stroke-weak` they started with measures
// 1.25:1 against the light card and 1.38:1 against the dark one — a hairline
// that effectively disappears. Red measures 4.53:1 and 3.99:1 on the same two
// surfaces, roughly a 3x jump, and clears the 3:1 that a non-text boundary
// needs in both themes.
//
// The label deliberately stays NEUTRAL rather than going red with the stroke.
// `text-brand` measures 4.53:1 on the light card but only 3.99:1 on the dark one
// (3.83:1 on its hover shade), and these are 12px — well under the 18.66px where
// AA relaxes to 3:1 — so a red label would fail AA in dark mode. The foreground
// token measures 11.97:1 / 19.41:1 over the fill below instead.
//
// bg-brand-subtle is a 16% red wash (1.25:1 / 1.14:1 against the card): far too
// faint to affect the label, but enough to give the pills a body so they read as
// chips rather than as three floating outlines.
export const productTagChip = `${tagChipBase} border-brand bg-brand-subtle text-foreground`;

// The TinaCMS card only, and deliberately NOT given the red stroke or the red
// wash the others now carry: this card's field is a fixed orange that does not
// follow the theme, and brand red measures 1.15:1 against it — it would be a
// less visible border than the white one, not a more visible one. Its white
// stroke measures 2.00:1 against the field, and the white label 5.49:1.
//
// No fill here either, for a measured reason: a white/15 wash would drop that
// label from 5.49:1 to 4.33:1, under AA for type this size. So this variant
// stays an outline chip while the others carry a body.
export const tinaTagChip = `${tagChipBase} border-white/40 text-white`;

// Cards carry at most three tags. Editors can add more in the CMS without
// breaking a card's height: the extras are simply not rendered.
export const MAX_VISIBLE_TAGS = 3;

// Tags come from a Tina `list: true` string field, so the array can be absent,
// hold empty strings an editor left behind, or hold duplicates.
export const visibleTags = (tags?: string[]): string[] =>
  (tags ?? [])
    .map((tag) => tag?.trim())
    .filter(Boolean)
    .slice(0, MAX_VISIBLE_TAGS);

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
