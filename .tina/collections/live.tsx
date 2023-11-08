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
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Section1",
      name: "section1",
    },
    {
      type: "string",
      label: "Section2",
      name: "section2",
    },
    // @ts-ignore
    seoSchema,
  ],
};
