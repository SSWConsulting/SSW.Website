import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename } from "./shared-fields";

export const pagesv2Schema: Collection = {
  label: "Base - Pages v2",
  name: "pagesv2",
  format: "json",
  path: "content/pagesv2",
  description: "Add components to build your page",
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return "/";
      }
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Blocks",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
  ],
};
