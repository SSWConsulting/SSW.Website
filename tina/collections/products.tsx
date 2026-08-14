import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename } from "./shared-fields";

export const productsIndexSchema: Collection = {
  label: "Products - Index",
  name: "productsIndex",
  path: "content/products/index",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => {
      return "/products";
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Title",
      name: "title",
      required: true,
    },
    {
      type: "string",
      label: "Subtitle",
      name: "subTitle",
      required: true,
    },
    {
      type: "object",
      label: "Products List",
      name: "productsList",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          isTitle: true,
          required: true,
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          label: "Tags",
          name: "tags",
          list: true,
          description:
            "Short capability labels shown as pills on the product card, so the grid can be skimmed without reading every description. Keep them to one or two words. Only the first three are rendered — extras are kept but not shown.",
        },
        {
          type: "image",
          label: "Logo",
          name: "logo",
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "products",
        },
      ],
    },
  ],
};

export const productsSchema: Collection = {
  label: "Products - Pages",
  name: "products",
  path: "content/products",
  format: "mdx",
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      return `/products/${document._sys.filename}`;
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
  ],
};
