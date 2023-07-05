import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

export const productsIndexSchema: Collection = {
  label: "Products - Index",
  name: "productsIndex",
  path: "content/products/index",
  format: "json",
  fields: [
    // @ts-ignore
    seoSchema,
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
          type: "image",
          label: "Logo",
          name: "logo",
        },
      ],
    },
  ],
};

export const productsSchema: Collection = {
  label: "Products",
  name: "products",
  path: "content/products",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/products/${document._sys.filename}`;
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
  ],
};
