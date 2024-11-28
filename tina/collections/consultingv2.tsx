import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { tipField } from "./shared-fields";

export const consultingv2Schema: Collection = {
  label: "Consultingv2 - Pages",
  name: "consultingv2",
  format: "json",
  path: "content/consultingv2",
  description: "Add components to build your page",
  ui: {
    beforeSubmit: async ({ values, form }) => {
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
