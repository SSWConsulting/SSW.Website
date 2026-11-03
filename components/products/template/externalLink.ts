// Off-site links open in a new tab, so the SSW page stays open behind them -
// which is what the blocks this template replaced did. The old UtilityButton
// carried `openInNewTab={true}` on the YouTube and Teams links and `false` on
// the in-site ones, so keying off the href reproduces that without asking an
// author to set a flag per link. The test matches the house pattern in
// components/blocks/v3/process/process.tsx.
const EXTERNAL_HREF = /^https?:\/\//;

export const isExternalHref = (href?: string | null) =>
  EXTERNAL_HREF.test(href ?? "");

/**
 * Spread onto an anchor or a RippleButton. RippleButton adds the same `rel`
 * itself for `_blank`, but a plain anchor needs it spelled out - without it a
 * new tab can reach back through `window.opener`.
 */
export const newTabProps = (href?: string | null) =>
  isExternalHref(href)
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
