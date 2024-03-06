import type { Collection } from "tinacms";
import { seoSchema } from "../../components/util/seo";

export const logosSchema: Collection = {
  label: "Logos",
  name: "logos",
  path: "content/logo",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/logo/${document._sys.filename}`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};
