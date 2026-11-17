import { describe, expect, it } from "@jest/globals";
import { getLinkKind, safeHref } from "../../helpers/links";

describe("getLinkKind", () => {
  it.each([
    ["/consulting", "internal"],
    ["#directions", "internal"],
    ["?tag=Angular", "internal"],
    ["https://www.ssw.com.au/company/about-us", "internal"],
    ["https://ssw.com.au/consulting", "internal"],
    ["https://www.ssw.com.au/rules/indicate-external-links", "branded"],
    ["https://www.ssw.com.au/people/adam-cogan", "branded"],
    ["https://tina.io/docs", "branded"],
    ["https://www.firstparking.com.au/locations/11-argyle-st/", "external"],
    ["http://example.com", "external"],
    ["//example.com/page", "external"],
    ["https://www.youtube.com/watch?v=pnPKusNJwE4", "external"],
    ["https://www.google.com/maps/place/SSW", "external"],
    // Hosts that only look like SSW's are still external.
    ["https://ssw.com.au.example.com", "external"],
    ["https://notssw.com.au", "external"],
    ["mailto:info@example.com", "other"],
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
    ["data:text/html,hi", "about:blank"],
    ["https://example.com", "https://example.com"],
    ["mailto:info@example.com", "mailto:info@example.com"],
    ["/consulting", "/consulting"],
    [undefined, ""],
  ])("%s becomes %s", (href, expected) => {
    expect(safeHref(href)).toBe(expected);
  });
});
