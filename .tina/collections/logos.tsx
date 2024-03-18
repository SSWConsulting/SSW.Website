import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

export const logosSchema: Collection = {
  label: "Logos",
  name: "logos",
  path: "content/logo",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "index") {
        return "/logo";
      }
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
      type: "rich-text",
      label: "Sub Header",
      name: "subHeader",
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
      type: "rich-text",
      name: "footer",
      label: "Footer",
    },
  ],
};
