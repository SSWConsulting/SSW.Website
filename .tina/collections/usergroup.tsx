import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

export const userGroupPageSchema: Collection = {
  label: "User Group Pages",
  name: "userGroupPage",
  format: "mdx",
  path: "content/netug",
  ui: {
    router: ({ document }) => {
      return `/netug/${document._sys.filename}`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      label: "About Content",
      name: "aboutContent",
      isBody: true,
    },
    {
      type: "object",
      label: "Agenda",
      name: "agenda",
      fields: [
        {
          type: "string",
          label: "time",
          name: "time",
        },
        {
          type: "string",
          label: "Label",
          name: "label",
        },
      ],
      list: true,
    },
    {
      type: "object",
      label: "Latest Tech",
      name: "latestTech",
      fields: Schemas.latestTechSchema.fields,
    },
  ],
};
