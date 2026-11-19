import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import { CustomLink } from "@/components/customLink";

const link = () => screen.getByRole("link");

describe("CustomLink", () => {
  it("opens an external site in a new tab with noopener only", () => {
    render(<CustomLink href="https://example.com">Example</CustomLink>);

    expect(link().getAttribute("target")).toBe("_blank");
    expect(link().getAttribute("rel")).toBe("noopener");
  });

  it("gives a tina.io link noopener only", () => {
    render(<CustomLink href="https://tina.io/docs">TinaCMS docs</CustomLink>);

    expect(link().getAttribute("rel")).toBe("noopener");
  });

  it("gives an SSW-branded site noopener only", () => {
    render(
      <CustomLink href="https://www.ssw.com.au/rules/indicate-external-links">
        the rule
      </CustomLink>
    );

    expect(link().getAttribute("target")).toBe("_blank");
    expect(link().getAttribute("rel")).toBe("noopener");
  });

  it("renders a relative path as a same-tab link with no rel", () => {
    render(<CustomLink href="/consulting">Consulting</CustomLink>);

    expect(link().getAttribute("target")).toBeNull();
    expect(link().getAttribute("rel")).toBeNull();
  });
});
