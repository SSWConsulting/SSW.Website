import type { Collection } from "tinacms";
import { seoSchema } from "../../components/util/seo";
import * as Schemas from "../../components/blocks";

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
      label: "Header",
      name: "header",
    },
    {
      type: "object",
      list: true,
      name: "_body",
      label: "Body",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "boolean",
      name: "showBorderBottom",
      label: "Show Border Bottom",
    },
    {
      type: "rich-text",
      name: "footer",
      label: "Footer",
    }
  ],
};
