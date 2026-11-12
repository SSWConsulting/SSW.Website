import { describe, expect, it, jest } from "@jest/globals";
import { render, screen, within } from "@testing-library/react";
import React from "react";
// jest.mock calls below are hoisted above this import by babel-jest
import { V3VerticalList } from "@/components/blocks/v3/verticalList/verticalList";

// useInView needs IntersectionObserver, which jsdom doesn't implement.
jest.mock("framer-motion", () => ({
  useInView: () => true,
}));

// tinacms ships ESM, which this jest setup doesn't transform. Stand in a
// minimal paragraph renderer that still goes through the block's own `p`.
jest.mock("tinacms/dist/react", () => ({ tinaField: () => undefined }));
jest.mock("tinacms/dist/rich-text", () => ({
  TinaMarkdown: ({ content, components }) =>
    content.children.map((node, i) =>
      components.p({
        key: i,
        children: node.children.map((c) => c.text).join(""),
      })
    ),
}));

const richText = (text: string) => ({
  type: "root",
  children: [{ type: "p", children: [{ type: "text", text }] }],
});

const data = {
  brow: "Agenda",
  heading: "Here's exactly what we'll cover",
  description: richText("In no particular order."),
  items: [
    {
      heading: "The build you parked",
      description: richText("Before and after costs."),
    },
    {
      heading: "Replacing the legacy system",
      description: richText("When replacement wins."),
    },
    { heading: "Live Q&A" },
  ],
};

describe("V3VerticalList", () => {
  it("renders the intro as a section heading", () => {
    render(<V3VerticalList data={data} />);
    expect(screen.getByText("Agenda")).toBeTruthy();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Here's exactly what we'll cover",
      })
    ).toBeTruthy();
    expect(screen.getByText("In no particular order.")).toBeTruthy();
  });

  it("lists every item in order, each with its own heading and description", () => {
    render(<V3VerticalList data={data} />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(
      items.map(
        (li) => within(li).getByRole("heading", { level: 3 }).textContent
      )
    ).toEqual([
      "The build you parked",
      "Replacing the legacy system",
      "Live Q&A",
    ]);
    expect(within(items[0]).getByText("Before and after costs.")).toBeTruthy();
  });

  it("does not number the items — it isn't a sequence", () => {
    render(<V3VerticalList data={data} />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    items.forEach((li) => expect(li.textContent).not.toMatch(/^\s*\d/));
  });

  it("renders no list when there are no items", () => {
    render(<V3VerticalList data={{ ...data, items: [] }} />);
    expect(screen.queryByRole("list")).toBeNull();
  });
});
