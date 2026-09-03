import { expect, test } from "@playwright/test";

/**
 * Guards the homepage hero's bottom edge (issue #4883).
 *
 * The hero card's scoop is drawn in the *next* section's background colour and
 * is clipped by the card's `overflow-hidden`, so the illusion only holds while
 * the two sections meet with no gap, no border and the same background. Any one
 * of those slipping puts a hairline back under the hero on mobile.
 */

const MOBILE_VIEWPORTS = [
  { name: "small Android", width: 360, height: 800 },
  { name: "iPhone SE", width: 375, height: 667 },
  { name: "Pixel 5", width: 393, height: 851 },
  { name: "iPhone 14 Pro Max", width: 430, height: 932 },
];

const THEMES = ["dark", "light"] as const;

const readHeroEdge = () => {
  const card = document.querySelector("[class*='rounded-feature']");
  if (!card) throw new Error("Hero card not found");
  const heroSection = card.closest("section.w-full");
  if (!heroSection) throw new Error("Hero section not found");

  // Each block is rendered inside its own `display: contents` wrapper, so the
  // sections are siblings in layout but not in the DOM.
  const wrapper = heroSection.parentElement;
  const nextWrapper = wrapper?.nextElementSibling;
  const nextSection =
    nextWrapper instanceof HTMLElement && nextWrapper.matches("section")
      ? nextWrapper
      : (nextWrapper?.querySelector("section") ?? null);
  if (!nextSection) throw new Error("Section after the hero not found");

  const heroRect = heroSection.getBoundingClientRect();
  const nextRect = nextSection.getBoundingClientRect();
  const heroStyle = getComputedStyle(heroSection);
  const nextStyle = getComputedStyle(nextSection);

  return {
    cardBottom: card.getBoundingClientRect().bottom,
    heroBottom: heroRect.bottom,
    nextTop: nextRect.top,
    heroBackground: heroStyle.backgroundColor,
    nextBackground: nextStyle.backgroundColor,
    heroBorderBottom: parseFloat(heroStyle.borderBottomWidth),
    nextBorderTop: parseFloat(nextStyle.borderTopWidth),
  };
};

for (const theme of THEMES) {
  for (const viewport of MOBILE_VIEWPORTS) {
    test(`hero meets the next section cleanly on ${viewport.name} (${theme})`, async ({
      page,
    }) => {
      await page.addInitScript((mode) => {
        try {
          window.localStorage.setItem("ssw-home-theme", mode);
        } catch {
          /* localStorage unavailable — the page falls back to its default */
        }
      }, theme);
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.waitForSelector("[class*='rounded-feature']");

      const edge = await page.evaluate(readHeroEdge);

      // The scoop is clipped at the card's bottom edge, so the card has to end
      // exactly where its section does.
      expect(edge.cardBottom).toBeCloseTo(edge.heroBottom, 1);
      // No gap and no overlap between the hero and what follows it.
      expect(edge.nextTop).toBeCloseTo(edge.heroBottom, 1);
      // A border on either side of that join draws the reported line.
      expect(edge.heroBorderBottom).toBe(0);
      expect(edge.nextBorderTop).toBe(0);
      // Different backgrounds would make the join visible even with no border.
      expect(edge.nextBackground).toBe(edge.heroBackground);
    });
  }
}
