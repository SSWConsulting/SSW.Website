import { describe, expect, it, jest } from "@jest/globals";
import { render } from "@testing-library/react";
import React from "react";

// useInView needs IntersectionObserver, which jsdom doesn't implement. The
// fade-in isn't what's under test here, so report "in view" and move on.
jest.mock("framer-motion", () => ({
  useInView: () => true,
}));

// eslint-disable-next-line @typescript-eslint/no-require-imports -- must load after the mock above
const V2ComponentWrapper = require("@/components/layout/v2ComponentWrapper")
  .default as React.ComponentType<{
  data: object;
  children?: React.ReactNode;
}>;

const renderWrapper = (background: unknown) =>
  render(
    <V2ComponentWrapper data={{ background }}>
      <p>content</p>
    </V2ComponentWrapper>
  );

/**
 * Regression guard for the `url(null)` bug.
 *
 * The wrapper used to build `backgroundImage: url(${...})` unconditionally, so a
 * block with no background produced `background-image: url(null)` or `url()`.
 * Browsers resolve those against the current path, so on /events/* it fetched
 * /events/null — answered by the catch-all route with 200 and ~631 KiB of HTML,
 * at high priority, on every page load. 39 blocks on one page emitted it.
 */
describe("V2ComponentWrapper background-image", () => {
  it.each([
    ["the key is absent", { backgroundColour: 0 }],
    ["it is null", { backgroundColour: 0, backgroundImage: null }],
    ["it is an empty string", { backgroundColour: 0, backgroundImage: "" }],
    ["there is no background at all", undefined],
  ])("emits no background-image when %s", (_case, background) => {
    const { container } = renderWrapper(background);
    expect(container.innerHTML).not.toContain("background-image");
  });

  it("still renders a real background image", () => {
    const { container } = renderWrapper({
      backgroundColour: 0,
      backgroundImage: "/images/background/waveBackground.svg",
    });
    const section = container.querySelector<HTMLElement>("section section");
    // jsdom normalises the value to url("…"), so match on the path itself.
    expect(section?.style.backgroundImage).toContain(
      "/images/background/waveBackground.svg"
    );
    expect(section?.style.backgroundSize).toBe("cover");
  });

  it("leaves the inline style off when the image is bleeding", () => {
    // Bleed renders the image as an <Image> instead of an inline background.
    const { container } = renderWrapper({
      backgroundColour: 0,
      backgroundImage: "/images/background/waveBackground.svg",
      bleed: true,
    });
    const section = container.querySelector<HTMLElement>("section section");
    expect(section?.style.backgroundImage).toBe("");
  });
});
