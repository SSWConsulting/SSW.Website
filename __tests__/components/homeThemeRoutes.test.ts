import { describe, expect, it } from "@jest/globals";
import { isThemedRoute } from "@/components/layout/homeTheme";

describe("isThemedRoute", () => {
  it("themes the listed section roots", () => {
    expect(isThemedRoute("/")).toBe(true);
    expect(isThemedRoute("/products")).toBe(true);
    expect(isThemedRoute("/consulting")).toBe(true);
    expect(isThemedRoute("/events")).toBe(true);
  });

  it("themes pages under /products, including sub-pages", () => {
    expect(isThemedRoute("/products/rewards")).toBe(true);
    expect(isThemedRoute("/products/sophiebot/docs")).toBe(true);
  });

  it("themes the clients index and each client story", () => {
    expect(isThemedRoute("/company/clients")).toBe(true);
    expect(isThemedRoute("/company/clients/fpe")).toBe(true);
  });

  it("leaves the other sections' detail pages unthemed", () => {
    expect(isThemedRoute("/consulting/bots")).toBe(false);
    expect(isThemedRoute("/events/user-group")).toBe(false);
  });

  it("does not match a route that merely starts with the same text", () => {
    expect(isThemedRoute("/products-archive")).toBe(false);
  });

  it("leaves unrelated routes unthemed", () => {
    expect(isThemedRoute("/company/contact-us")).toBe(false);
  });
});
