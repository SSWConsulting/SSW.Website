import { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { componentRenderer } from "./mdxComponentRenderer";
import { videoEmbedBlockSchema } from "./videoEmbed";

export const ContentCard = ({ data }) => {
  const component = (
    <article className="relative mx-auto my-5 w-full border-b-2 border-solid border-sswRed bg-gray-75 p-10 text-center">
      <TinaMarkdown content={data.content} components={componentRenderer} />
    </article>
  );

  if (!data.prose) {
    return component;
  }

  return (
    <div className="prose-ul-li:grid-6 prose max-w-full grow prose-p:text-justify prose-strong:text-sswRed prose-ul:grid prose-ul:grid-flow-col prose-ul:grid-rows-12 prose-ul:text-left descendant-div:!m-0">
      {component}
    </div>
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
      type: "rich-text",
      label: "Content",
      name: "content",
      templates: [videoEmbedBlockSchema],
    },
  ],
};
