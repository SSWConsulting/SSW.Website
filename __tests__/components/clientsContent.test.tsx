import { describe, expect, it, jest } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import React from "react";
import { ClientsHero } from "@/components/company/clientsHero";
import { ClientStoryDialog } from "@/components/company/clientStoryDialog";
import type { ClientDisplay } from "@/helpers/clientTypes";

jest.mock("@/components/blocks/mdxComponentRenderer", () => ({
  componentRenderer: {},
}));
jest.mock("@/components/button/rippleButtonV2", () => ({
  __esModule: true,
  default: () => null,
}));
jest.mock("@/components/customLink", () => ({ CustomLink: () => null }));
jest.mock("tinacms/dist/react", () => ({
  tinaField: (_obj, field) => field,
}));
jest.mock("tinacms/dist/rich-text", () => ({ TinaMarkdown: () => null }));

describe("ClientsHero title", () => {
  it.each([
    [
      "Great **partnerships** deliver outcomes",
      "Great partnerships deliver outcomes",
    ],
    [
      "**Great** partnerships. **Extraordinary** outcomes.",
      "Great partnerships. Extraordinary outcomes.",
    ],
    ["Our clients", "Our clients"],
    [
      "Great partnerships. **Extraordinary outcomes.**",
      "Great partnerships. Extraordinary outcomes.",
    ],
  ])("preserves every part of %s", (title, expected) => {
    render(<ClientsHero company={{ title }} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading.textContent).toBe(expected);
    expect(heading.getAttribute("data-tina-field")).toBe("title");
  });
});

describe("ClientStoryDialog heading", () => {
  it.each([
    ["A clearer view of the fleet", "headline"],
    [undefined, "name"],
  ])("targets the displayed %s in Tina", (headline, field) => {
    HTMLDialogElement.prototype.showModal = jest.fn(function (
      this: HTMLDialogElement
    ) {
      this.setAttribute("open", "");
    });
    const client: ClientDisplay = {
      name: "Toll",
      headline,
      categories: [],
      content: { type: "root", children: [] },
    };
    render(<ClientStoryDialog client={client} onClose={() => {}} />);

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading.textContent).toBe(headline || client.name);
    expect(heading.getAttribute("data-tina-field")).toBe(field);
  });
});
