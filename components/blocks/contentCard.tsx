import classNames from "classnames";
import type { Template } from "tinacms";
import type { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import {
  CustomImage,
  CustomImageProps,
  customImageBlockSchema,
} from "./customImage";
import { VerticalListItem, verticalListItemSchema } from "./verticalListItem";
import { VideoEmbed, videoEmbedBlockSchema } from "./videoEmbed";

export type ContentCardProps = {
  data: {
    content: TinaMarkdownContent;
    prose?: boolean;
    centerAlignedText?: boolean;
  };
};

const contentCardComponentRenderer: Components<{
  CustomImage: CustomImageProps;
  VerticalListItem: {
    icon: string;
    content: string;
  };
  VideoEmbed: {
    url: string;
  };
}> = {
  CustomImage: (props) => <CustomImage data={props} />,
  VerticalListItem: (props) => <VerticalListItem data={props} />,
  VideoEmbed: (props) => <VideoEmbed data={props} />,
};

export const ContentCard = ({ data }: ContentCardProps) => {
  const component = (
    <article className="relative mx-auto my-5 h-full w-full border-b-2 border-solid border-sswRed bg-gray-75 p-10">
      <TinaMarkdown
        content={data.content}
        components={contentCardComponentRenderer}
      />
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
          data.centerAlignedText
            ? "prose-p:text-center"
            : "prose-p:text-justify"
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
        customImageBlockSchema,
        verticalListItemSchema,
        videoEmbedBlockSchema,
      ],
    },
  ],
};
