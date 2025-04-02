import { Template } from "tinacms";
import { colorBlockSchema } from "./colorBlock";
import { customImageBlockSchema } from "./customImage";
import { verticalListItemSchema } from "./verticalListItem";
import { videoEmbedBlockSchema } from "./videoEmbed.schema";

export const contentCardBlockSchema: Template = {
  name: "ContentCard",
  label: "Content Card",
  ui: {
    previewSrc: "/images/thumbs/tina/content-card.jpg",
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
        colorBlockSchema,
      ],
    },
  ],
};
