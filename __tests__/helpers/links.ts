import { describe, expect, it } from "@jest/globals";
import {
  getLinkKind,
  isSswOwnedUrl,
  isSswSubsiteUrl,
  safeHref,
} from "../../helpers/links";

describe("getLinkKind", () => {
  it.each([
    ["/consulting", "internal"],
    ["#directions", "internal"],
    ["?tag=Angular", "internal"],
    ["https://www.ssw.com.au/company/about-us", "internal"],
    ["https://ssw.com.au/consulting", "internal"],
    ["https://www.ssw.com.au/rules/indicate-external-links", "branded"],
    ["https://www.ssw.com.au/people/adam-cogan", "branded"],
    ["https://rules.ssw.com.au/indicate-external-links", "branded"],
    ["https://blog.ssw.com.au", "branded"],
    ["https://design.ssw.com.au/?path=/docs", "branded"],
    ["/rules", "branded"],
    ["/people/adam-cogan", "branded"],
    ["/rules?q=links#top", "branded"],
    ["/rules-of-thumb", "internal"],
    ["rules", "internal"],
    ["https://tina.io/docs", "branded"],
    ["https://www.ssw.fr", "branded"],
    ["https://www.ssw.com.cn/", "branded"],
    ["https://tv.ssw.com/", "branded"],
    ["https://www.sswchapel.com.au", "branded"],
    ["https://sswdigital.com.au/", "branded"],
    ["https://yakshaver.ai", "branded"],
    ["https://www.sugarlearning.com/", "branded"],
    ["https://firebootcamp.com", "branded"],
    ["https://codeauditor.com/", "branded"],
    ["https://www.firstparking.com.au/locations/11-argyle-st/", "external"],
    ["http://example.com", "external"],
    ["//example.com/page", "external"],
    ["https://www.youtube.com/watch?v=pnPKusNJwE4", "youtube"],
    ["https://youtu.be/bftlhgQp9Ac", "youtube"],
    ["https://m.youtube.com/@SSWTV", "youtube"],
    ["https://www.google.com/maps/place/SSW", "maps"],
    ["https://www.google.com.au/maps/place/SSW", "maps"],
    ["https://maps.google.com/?q=SSW", "maps"],
    ["https://maps.app.goo.gl/abc123", "maps"],
    ["https://goo.gl/maps/abc123", "maps"],
    ["https://www.google.com/search?q=SSW", "external"],
    ["https://notyoutube.com/watch", "external"],
    // Hosts that only look like SSW's are still external.
    ["https://ssw.com.au.example.com", "external"],
    ["https://notssw.com.au", "external"],
    ["https://tina.io.example.com", "external"],
    ["https://notyakshaver.ai", "external"],
    ["mailto:info@example.com", "email"],
    ["MAILTO:info@example.com", "email"],
    ["tel:+61299533000", "other"],
    ["", "other"],
    [undefined, "other"],
    ["about:blank", "other"],
  ])("%s is %s", (href, kind) => {
    expect(getLinkKind(href)).toBe(kind);
  });
});

describe("safeHref", () => {
  it.each([
    ["javascript:alert(1)", "about:blank"],
    [" JavaScript:alert(1)", "about:blank"],
    ["java\tscript:alert(1)", "about:blank"],
    ["java\nscript:alert(1)", "about:blank"],
    ["data:text/html,hi", "about:blank"],
    ["https://example.com", "https://example.com"],
    ["mailto:info@example.com", "mailto:info@example.com"],
    ["tel:+61299533000", "tel:+61299533000"],
    ["#directions", "#directions"],
    ["/consulting", "/consulting"],
    [undefined, ""],
  ])("%s becomes %s", (href, expected) => {
    expect(safeHref(href)).toBe(expected);
  });
});

describe("isSswOwnedUrl", () => {
  it.each([
    ["https://www.ssw.com.au/rules", true],
    ["https://rules.ssw.com.au", true],
    ["https://tina.io", true],
    ["https://www.codeauditor.com/", true],
    ["//www.ssw.fr", true],
    ["/rules", false],
    ["https://example.com", false],
    ["https://ssw.com.au.example.com", false],
  ])("%s is %s", (href, expected) => {
    expect(isSswOwnedUrl(href)).toBe(expected);
  });
});

describe("isSswSubsiteUrl", () => {
  it.each([
    ["https://www.ssw.com.au/rules/indicate-external-links", true],
    ["https://ssw.com.au/people", true],
    ["https://www.ssw.com.au/company", false],
    ["https://www.ssw.com.au/rules-of-thumb", false],
    ["https://rules.ssw.com.au", false],
    ["/rules", false],
  ])("%s is %s", (href, expected) => {
    expect(isSswSubsiteUrl(href)).toBe(expected);
  });
});
