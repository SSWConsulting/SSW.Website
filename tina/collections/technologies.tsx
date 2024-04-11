import type { Collection } from "tinacms";
import { tipField } from "./shared-fields";

export const technologiesSchema: Collection = {
  label: "Consulting - Technology Cards",
  name: "technologies",
  format: "mdx",
  path: "content/technologies",
  fields: [
    tipField,
    {
      type: "string",
      label: "Name",
      name: "name",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      label: "Read More Slug",
      name: "readMoreSlug",
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // @ts-ignore
      uploadDir: () => "thumbs",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
  ],
};
