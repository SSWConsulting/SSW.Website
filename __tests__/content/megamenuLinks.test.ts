import { describe, expect, it } from "@jest/globals";
import menu from "../../content/megamenu/menu.json";

// Pages served by this site must be relative links, so a PR staging slot (or
// localhost) keeps visitors on that deployment instead of sending them to
// production. /rules and /people are separate apps that only production routes
// to, so they stay absolute.
// Matches the host with or without a scheme ("//www.ssw.com.au") and with an
// explicit port, since both still leave a staging slot for production.
const SSW_HOST = String.raw`^(https?:)?\/\/(www\.)?ssw\.com\.au(:\d+)?`;
const OTHER_SSW_APPS = new RegExp(`${SSW_HOST}\\/(rules|people)(\\/|$)`, "i");
const SSW_WEBSITE = new RegExp(`${SSW_HOST}(\\/|$)`, "i");

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

const isAbsoluteSiteLink = (url: string) =>
  SSW_WEBSITE.test(url) && !OTHER_SSW_APPS.test(url);

describe("mega menu links", () => {
  it.each([
    "https://www.ssw.com.au/company/testimonials",
    "http://ssw.com.au/company",
    "//www.ssw.com.au/company/testimonials",
    "https://www.ssw.com.au:443/company/testimonials",
    "https://www.ssw.com.au",
  ])("flags %s as an absolute link to this site", (url) => {
    expect(isAbsoluteSiteLink(url)).toBe(true);
  });

  it.each([
    "/company/testimonials",
    "https://www.ssw.com.au/rules",
    "https://www.ssw.com.au:443/people/adam-cogan",
    "//www.ssw.com.au/rules/",
    "https://www.ssw.com.au.evil.com/x",
    "https://sswtv.com/",
  ])("allows %s", (url) => {
    expect(isAbsoluteSiteLink(url)).toBe(false);
  });

  it("link to this site's pages with relative paths", () => {
    const absolute = urlsIn(menu).filter(isAbsoluteSiteLink);

    expect(absolute).toEqual([]);
  });
});
