import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

export const companySchema: Collection = {
  label: "Company Pages",
  name: "company",
  format: "mdx",
  path: "content/company",
  ui: {
    router: ({ document }) => {
      return `/company/${document._sys.filename}`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "object",
      list: true,
      name: "afterBody",
      label: "After body",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
  ],
};
