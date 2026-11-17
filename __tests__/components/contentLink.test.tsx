import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ContentLink } from "@/components/contentLink";

const link = () => screen.getByRole("link");
const icon = (container: HTMLElement) =>
  container.querySelector(".content-link-icon");
// firstChild, not firstElementChild: the link text is a text node.
const iconIsFirst = () =>
  (link().firstChild as Element | null)?.classList?.contains(
    "content-link-icon"
  ) ?? false;

describe("ContentLink", () => {
  it("gives an external link an icon and opens it in a new tab", () => {
    const { container } = render(
      <ContentLink url="https://www.firstparking.com.au/">
        First Parking
      </ContentLink>
    );

    expect(link().getAttribute("target")).toBe("_blank");
    expect(link().getAttribute("rel")).toBe("noopener noreferrer nofollow");
    expect(icon(container)).not.toBeNull();
    expect(iconIsFirst()).toBe(false);
    expect(link().textContent).toContain("(opens in a new tab)");
  });

  it("gives tina.io the external-link icon", () => {
    const { container } = render(
      <ContentLink url="https://tina.io/docs">TinaCMS docs</ContentLink>
    );

    expect(icon(container)).not.toBeNull();
  });

  it.each([
    ["YouTube", "https://www.youtube.com/watch?v=pnPKusNJwE4"],
    ["Google Maps", "https://www.google.com/maps/place/SSW"],
  ])("puts the %s icon before the text, in a new tab", (_, url) => {
    const { container } = render(<ContentLink url={url}>Watch</ContentLink>);

    expect(link().getAttribute("target")).toBe("_blank");
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

  it("opens an SSW subsite in a new tab with no icon", () => {
    const { container } = render(
      <ContentLink url="https://www.ssw.com.au/rules/indicate-external-links">
        the rule
      </ContentLink>
    );

    expect(link().getAttribute("target")).toBe("_blank");
    expect(icon(container)).toBeNull();
  });

  it("leaves mailto links alone", () => {
    const { container } = render(
      <ContentLink url="mailto:info@example.com">Email us</ContentLink>
    );

    expect(link().getAttribute("href")).toBe("mailto:info@example.com");
    expect(link().getAttribute("target")).toBeNull();
    expect(icon(container)).toBeNull();
  });

  it("drops javascript: links", () => {
    render(<ContentLink url="javascript:alert(1)">Bad</ContentLink>);

    expect(link().getAttribute("href")).toBe("about:blank");
  });
});
