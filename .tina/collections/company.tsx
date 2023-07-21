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
    {
      type: "object",
      label: "History Cards",
      name: "historyCards",
      list: true,
      fields: [
        {
          type: "number",
          label: "Year",
          name: "year",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Location",
          name: "location",
          options: [
            {
              value: "Australia",
              label: "Australia",
            },
            {
              value: "France",
              label: "France",
            },
            {
              value: "China",
              label: "China",
            },
          ],
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
        },
      ],
    },
  ],
};
