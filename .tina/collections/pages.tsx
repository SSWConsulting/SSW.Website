import type { Collection } from "tinacms";

import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { tipField } from "./shared-fields";

export const pagesSchema: Collection = {
  label: "Base - Pages",
  name: "page",
  format: "mdx",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    tipField,
    // @ts-ignore
    seoSchema,
    {
      type: "boolean",
      name: "breadcrumbs",
      label: "Breadcrumbs enabled",
    },
    {
      type: "object",
      list: true,
      name: "beforeBody",
      label: "Before body",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
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
      name: "sideBar",
      label: "Side Bar",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
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
