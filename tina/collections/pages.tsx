import type { Collection } from "tinacms";

import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename } from "./shared-fields";

export const pagesSchema: Collection = {
  label: "Base - Pages",
  name: "page",
  format: "mdx",
  path: "content/pages",
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
    {
      type: "boolean",
      name: "breadcrumbs",
      label: "Breadcrumbs enabled",
    },
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "rich-text",
      name: "subTitle",
      label: "Sub Title",
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
      type: "boolean",
      label: "Remove body top margin",
      name: "removeBodyTopMargin",
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
      type: "boolean",
      name: "centeredBodyText",
      label: "Centered body text",
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
