import { describe, expect, it } from "@jest/globals";
import menu from "../../content/megamenu/menu.json";

// Pages served by this site must be relative links, so a PR staging slot (or
// localhost) keeps visitors on that deployment instead of sending them to
// production. /rules and /people are separate apps that only production routes
// to, so they stay absolute.
const OTHER_SSW_APPS = /^https:\/\/www\.ssw\.com\.au\/(rules|people)(\/|$)/;
const SSW_WEBSITE = /^https?:\/\/(www\.)?ssw\.com\.au(\/|$)/i;

const urlsIn = (node: unknown): string[] => {
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(urlsIn);
  if (node && typeof node === "object") {
    return Object.entries(node).flatMap(([key, value]) =>
      typeof value === "string"
        ? /url|href|link/i.test(key)
          ? [value]
          : []
        : urlsIn(value)
    );
  }
  return [];
};

describe("mega menu links", () => {
  it("link to this site's pages with relative paths", () => {
    const absolute = urlsIn(menu).filter(
      (url) => SSW_WEBSITE.test(url) && !OTHER_SSW_APPS.test(url)
    );

    expect(absolute).toEqual([]);
  });
});
