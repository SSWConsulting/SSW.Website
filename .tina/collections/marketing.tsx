import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { sides } from "../../components/marketing/Marketing";

export const marketingSchema: Collection = {
  label: "Marketing - Pages",
  name: "marketing",
  path: "content/marketing",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "image",
      label: "Background image",
      name: "backgroundImage",
      required: true,
      // @ts-ignore
      uploadDir: () => "marketings",
    },
    {
      type: "rich-text",
      label: "Marketing media column",
      name: "mediaComponent",
      required: true,
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
    {
      type: "string",
      label: "Text side",
      name: "textSide",
      options: sides,
      required: true,
    },
  ],
};
