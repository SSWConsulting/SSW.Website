import classNames from "classnames";
import type { Template } from "tinacms";
import type { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { customImageBlockSchema } from "./customImage";
import { componentRenderer } from "./mdxComponentRenderer";
import { verticalListItemSchema } from "./verticalListItem";
import { videoEmbedBlockSchema } from "./videoEmbed";

type ContentCardProps = {
  data: {
    content: TinaMarkdownContent;
    prose?: boolean;
    centerAlignedText?: boolean;
  };
};

export const ContentCard = ({ data }: ContentCardProps) => {
  const component = (
    <article className="relative mx-auto my-5 h-full w-full border-b-2 border-solid border-sswRed bg-gray-75 p-10">
      <TinaMarkdown content={data.content} components={componentRenderer} />
    </article>
  );

  if (!data.prose) {
    return component;
  }

  return (
    <>
      <div
        className={classNames(
          "prose max-w-full grow",
          data.centerAlignedText ? "text-center" : "text-justify"
        )}
      >
        {component}
      </div>
    </>
  );
};

export const contentCardBlockSchema: Template = {
  name: "ContentCard",
  label: "Content Card",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
    },
  },
  fields: [
    {
      type: "boolean",
      label: "Prose",
      name: "prose",
    },
    {
      type: "boolean",
      label: "Centered Aligned Text",
      name: "centerAlignedText",
    },
    {
      type: "rich-text",
      label: "Content",
      name: "content",
      templates: [
        videoEmbedBlockSchema,
        verticalListItemSchema,
        customImageBlockSchema,
      ],
    },
  ],
};
