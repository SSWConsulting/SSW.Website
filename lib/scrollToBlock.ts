// Blocks are wrapped in `<div className="contents" data-tinafield>` by
// blocks-renderer.tsx; that wrapper is the block boundary here.
const BLOCK_WRAPPER = "[data-tinafield]";

export function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** The next block after `fromEl`'s own that renders a visible box. */
export function findNextBlock(fromEl: Element): Element | null {
  let sibling = fromEl.closest(BLOCK_WRAPPER)?.nextElementSibling ?? null;
  while (sibling) {
    const root = sibling.firstElementChild;
    if (
      root &&
      root.getClientRects().length > 0 &&
      root.getAttribute("aria-hidden") !== "true"
    ) {
      return root;
    }
    sibling = sibling.nextElementSibling;
  }
  return null;
}

function contentSection(blockRoot: Element): Element {
  return blockRoot.querySelector(":scope > [data-block-content]") ?? blockRoot;
}

/** Document offset where a block's content starts, past its container padding. */
export function getBlockContentTop(blockRoot: Element): number {
  const content = contentSection(blockRoot);
  const container = content.firstElementChild;
  const laidOut = !!container && container.getClientRects().length > 0;
  const el = laidOut ? container : content;
  const padding = laidOut
    ? parseFloat(getComputedStyle(container).paddingTop) || 0
    : 0;
  return window.scrollY + el.getBoundingClientRect().top + padding;
}

export function scrollToBlockContent(blockRoot: Element): void {
  window.scrollTo({
    top: getBlockContentTop(blockRoot),
    // "instant" not "auto" — auto defers to the global scroll-smooth CSS.
    behavior: prefersReducedMotion() ? "instant" : "smooth",
  });
  // Move the reading position too, so screen readers and the keyboard follow.
  const target = contentSection(blockRoot) as HTMLElement;
  if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
  target.focus({ preventScroll: true });
}
