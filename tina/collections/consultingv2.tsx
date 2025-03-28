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
    router: (args) => {
      return `/consulting/${args.document._sys.filename}`;
    },
    filename: {
      showFirst: true,
      description:
        "The filename will be used for the URL path of the page (slug). It should be unique and spaces aren't allowed.",
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
