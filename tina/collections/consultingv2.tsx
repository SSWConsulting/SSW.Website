import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { tipField } from "./shared-fields";

export const consultingIndexSchema: Collection = {
  label: "Consulting - Index",
  name: "consultingIndex",
  path: "content/consulting/index",
  format: "json",
  ui: {
    router: () => {
      return "/consulting";
    },
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Sidebar",
      name: "sidebar",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "reference",
          label: "Associated Tag",
          name: "tag",
          collections: ["consultingTag"],
        },
      ],
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.category?.split("/")[3].replace(".json", "") };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["consultingCategory"],
        },
        {
          type: "object",
          label: "Pages",
          name: "pages",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title",
            },
            {
              type: "string",
              label: "Description",
              name: "description",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "image",
              label: "Logo",
              name: "logo",
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              uploadDir: () => "thumbs",
            },
            {
              type: "reference",
              label: "Page",
              name: "page",
              collections: ["consulting", "consultingv2"],
              required: true,
            },
            {
              type: "string",
              label: "External URL",
              description:
                "Takes precedence over page if selected. If using this, you still have to select a (random) page.",
              name: "externalUrl",
            },
            {
              type: "object",
              label: "Tags",
              name: "tags",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.tag };
                },
              },
              fields: [
                {
                  type: "reference",
                  label: "Tag",
                  name: "tag",
                  collections: ["consultingTag"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const consultingCategorySchema: Collection = {
  label: "Consulting - Categories",
  name: "consultingCategory",
  path: "content/consulting/category",

  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};

export const consultingTagSchema: Collection = {
  label: "Consulting - Tags",
  name: "consultingTag",
  path: "content/consulting/tag",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};
export const consultingv2Schema: Collection = {
  label: "Consultingv2 - Pages",
  name: "consultingv2",
  format: "json",
  path: "content/consultingv2",
  description: "Add components to build your page",
  ui: {
    beforeSubmit: async ({ values, form }) => {
      if (form.crudType === "create") {
        const seo = values.seo as { title: string };
        const blocks = form.values.blocks as {
          finalBreadcrumb: string;
          _template: string;
        }[];
        if (!blocks) {
          return values;
        }
        const breadcrumbsWithTitle = blocks.map((block) => {
          if (block._template !== "breadcrumbs") {
            return block;
          }
          if (block.finalBreadcrumb) {
            return block;
          }
          return {
            ...block,
            finalBreadcrumb: seo.title,
          };
        });
        const returner = {
          ...values,
          blocks: [...breadcrumbsWithTitle],
        };
        return returner;
      }
    },
    router: (args) => {
      return `/consulting/${args.document._sys.filename}`;
    },
  },
  fields: [
    tipField,
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
