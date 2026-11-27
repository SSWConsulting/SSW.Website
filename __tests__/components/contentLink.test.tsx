import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ContentLink } from "@/components/contentLink";

const link = () => screen.getByRole("link");
const icon = (container: HTMLElement) =>
  container.querySelector(".content-link-icon");
// The leading icon sits in a nowrap span that is the link's first child.
// firstChild, not firstElementChild: the link text is a text node.
const iconIsFirst = () =>
  !!(link().firstChild as Element | null)?.querySelector?.(
    ":scope > .content-link-icon"
  );

describe("ContentLink", () => {
  it("gives an external link an icon and opens it in a new tab", () => {
    const { container } = render(
      <ContentLink url="https://www.firstparking.com.au/">
        First Parking
      </ContentLink>
    );

    expect(link().getAttribute("target")).toBe("_blank");
    expect(link().getAttribute("rel")).toBe("noopener");
    expect(icon(container)).not.toBeNull();
    expect(iconIsFirst()).toBe(false);
    expect(link().textContent).toContain("(opens in a new tab)");
  });

  it.each([
    ["tina.io", "https://tina.io/docs"],
    ["YakShaver", "https://yakshaver.ai"],
    ["an SSW subsite", "https://www.ssw.com.au/rules/indicate-external-links"],
    ["an SSW subdomain", "https://rules.ssw.com.au"],
  ])("keeps %s in the same tab with no icon", (_, url) => {
    const { container } = render(<ContentLink url={url}>SSW</ContentLink>);

    expect(link().getAttribute("target")).toBeNull();
    expect(link().getAttribute("rel")).toBeNull();
    expect(icon(container)).toBeNull();
    expect(link().textContent).toBe("SSW");
  });

  it("keeps the external-link icon on the same line as the last word", () => {
    const { container } = render(
      <ContentLink url="https://example.com">Example site</ContentLink>
    );

    const wrapper = icon(container)?.parentElement;
    expect(wrapper?.classList.contains("whitespace-nowrap")).toBe(true);
    // A word joiner between the text and the icon stops a line break there.
    expect(wrapper?.textContent?.startsWith("\u2060")).toBe(true);
  });

  it.each([
    ["YouTube", "https://www.youtube.com/watch?v=pnPKusNJwE4"],
    ["Google Maps", "https://www.google.com/maps/place/SSW"],
  ])("puts the %s icon before the text, in a new tab", (_, url) => {
    const { container } = render(<ContentLink url={url}>Watch</ContentLink>);

    expect(link().getAttribute("target")).toBe("_blank");
    expect(link().getAttribute("rel")).toBe("noopener");
    expect(container.querySelectorAll(".content-link-icon")).toHaveLength(1);
    expect(iconIsFirst()).toBe(true);
  });

  it("keeps an internal link in the same tab with no icon", () => {
    const { container } = render(
      <ContentLink url="/consulting">Consulting</ContentLink>
    );

    expect(link().getAttribute("href")).toBe("/consulting");
    expect(link().getAttribute("target")).toBeNull();
    expect(icon(container)).toBeNull();
    expect(link().textContent).toBe("Consulting");
  });

  it("gives a mailto link an email icon, in the same tab", () => {
    const { container } = render(
      <ContentLink url="mailto:info@example.com">Email us</ContentLink>
    );

    expect(link().getAttribute("href")).toBe("mailto:info@example.com");
    expect(link().getAttribute("target")).toBeNull();
    expect(icon(container)).not.toBeNull();
    expect(link().textContent).not.toContain("(opens in a new tab)");
  });

  it("leaves tel links alone", () => {
    const { container } = render(
      <ContentLink url="tel:+61299533000">Call us</ContentLink>
    );

    expect(link().getAttribute("target")).toBeNull();
    expect(icon(container)).toBeNull();
  });

  it("drops javascript: links", () => {
    render(<ContentLink url="javascript:alert(1)">Bad</ContentLink>);

    expect(link().getAttribute("href")).toBe("about:blank");
  });
});
