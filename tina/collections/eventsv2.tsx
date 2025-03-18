import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

export const eventsv2Schema: Collection = {
  label: "Eventsv2 - Pages",
  name: "eventsv2",
  format: "json",
  path: "content/eventsv2",
  description: "Add components to build your page",
  ui: {
    router: (args) => {
      return `/events/${args.document._sys.filename}`;
    },
    filename: {
      showFirst: true,
      description:
        "The filename will be used for the URL path of the page (slug). It should be unique and spaces aren't allowed.",
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
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
