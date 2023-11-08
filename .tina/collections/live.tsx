import { Collection } from "tinacms";
import { seoSchema } from "../../components/util/seo";

export const liveSchema: Collection = {
  label: "Live - Pages",
  name: "live",
  path: "content/live",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
  ],
};
