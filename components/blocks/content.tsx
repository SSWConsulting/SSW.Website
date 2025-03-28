import classNames from "classnames";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { clientLogosBlockSchema } from "../../components/blocks/clientLogos";
import { SectionColor } from "../util/constants/styles";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { colorBlockSchema } from "./colorBlock";
import { customImageBlockSchema } from "./customImage";
import { componentRenderer } from "./mdxComponentRenderer";
import { videoEmbedBlockSchema } from "./videoEmbed.schema";

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

export const paddingOptions = {
  "Mobile: No Padding": "p-0 md:px-8",
  "Mobile: No Top and Horizontal Padding": "pt-0 px-0 md:px-8",
};

export type ContentType = {
  title?: string;
  content?: TinaMarkdownContent;
  paddingClass?: keyof typeof paddingOptions;
  size?: keyof typeof sizeClasses;
  align?: keyof typeof alignmentClasses;
  backgroundColor?: string;
};

type ContentProps = { data: ContentType };

export const Content = ({ data }: ContentProps) => {
  if (!data) {
    return <></>;
  }
  const alignment = alignmentClasses[data?.align] ?? alignmentClasses.left;
  const size = sizeClasses[data?.size] ?? sizeClasses.base;
  return (
    <Section
      color={data.backgroundColor as SectionColor}
      data-tina-field={tinaField(data, contentBlock.title)}
      className="px-8 md:px-0"
    >
      <Container
        size="medium"
        className={classNames("prose", alignment, size)}
        padding={paddingOptions[data.paddingClass] ?? ""}
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

const contentBlock = {
  title: "title",
  content: "content",
} as const;

export const contentBlockSchema: Template = {
  name: "Content",
  label: "Content",
  ui: {
    previewSrc: "/images/thumbs/tina/content.jpg",
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
      label: "Container Padding",
      name: "paddingClass",
      options: Object.keys(paddingOptions),
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
