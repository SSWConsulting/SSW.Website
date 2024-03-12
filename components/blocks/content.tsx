import classNames from "classnames";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { clientLogosBlockSchema } from "./clientLogos";
import { colorBlockSchema } from "./colorBlock";
import { customImageBlockSchema } from "./customImage";
import { componentRenderer } from "./mdxComponentRenderer";
import { videoEmbedBlockSchema } from "./videoEmbed";

const alignmentClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const sizeClasses = {
  sm: "prose-sm",
  base: "prose-base",
  lg: "prose-lg",
  xl: "prose-xl",
  "2xl": "prose-2xl",
};

export const Content = ({ data }) => {
  const alignment = alignmentClasses[data.align] ?? alignmentClasses.left;
  const size = sizeClasses[data.size] ?? sizeClasses.base;
  return (
    <Section
      color={data.backgroundColor}
      data-tina-field={tinaField(data, contentBlock.title)}
    >
      <Container
        size="medium"
        className={classNames("prose", alignment, size)}
        padding={data.containerClass ?? ""}
      >
        {data.title && (
          <h2 className="pb-5 pt-16 text-3xl font-light">{data.title}</h2>
        )}
        <span data-tina-field={tinaField(data, contentBlock.content)}>
          <TinaMarkdown content={data.content} components={componentRenderer} />
        </span>
      </Container>
    </Section>
  );
};

export const contentBlock = {
  title: "title",
  content: "content",
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
      name: contentBlock.title,
    },
    {
      type: "rich-text",
      label: "Content",
      name: contentBlock.content,
      templates: [
        customImageBlockSchema,
        clientLogosBlockSchema,
        videoEmbedBlockSchema,
        colorBlockSchema,
      ],
    },
    {
      type: "string",
      label: "Custom Container Class",
      name: "containerClass",
    },
    {
      type: "string",
      label: "Text size",
      name: "size",
      options: [
        { label: "small", value: "sm" },
        { label: "normal", value: "base" },
        { label: "large", value: "lg" },
        { label: "extra large", value: "xl" },
        { label: "2x large", value: "2xl" },
      ],
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
