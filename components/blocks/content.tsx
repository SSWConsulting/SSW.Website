import React from "react";
import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";
import { Section } from "../util/section";

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

export const Content = ({ data }) => {
  const alignment = alignmentClasses[data.align] ?? alignmentClasses.left;
  return (
    <Section color={data.backgroundColor}>
      <Container size="medium" className={`prose ${alignment}`}>
        {data.title && <h2 className="text-3xl font-light pt-16 pb-5">{data.title}</h2>}
        <TinaMarkdown content={data.content} />
      </Container>
    </Section>
  );
};

export const contentBlockSchema: Template = {
  name: "Content",
  label: "Content",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      body: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
    },
    {
      type: "string",
      label: "Align",
      name: "align",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
