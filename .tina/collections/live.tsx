import { Collection } from "tinacms";

export const liveSchema: Collection = {
  label: "Live - Pages",
  name: "live",
  path: "content/live/category",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};
