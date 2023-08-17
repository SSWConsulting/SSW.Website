import { TinaField } from "tinacms";

export const benefitsFields: TinaField[] = [
  {
    type: "image",
    label: "Image URL",
    name: "image",
    // @ts-ignore
    uploadDir: () => "benefits",
  },
  {
    type: "string",
    label: "Title",
    name: "title",
  },
  {
    type: "rich-text",
    label: "Description",
    name: "description",
  },
  {
    type: "string",
    required: false,
    label: "linkName",
    name: "linkName",
  },
  {
    type: "string",
    required: false,
    label: "linkURL",
    name: "linkURL",
  },
];
