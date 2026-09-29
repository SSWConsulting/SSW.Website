import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3VerticalListSchema: Template = {
  name: "v3VerticalList",
  label: "<V3> Vertical List",
  ui: {
    defaultItem: {
      brow: "Lorem ipsum",
      heading: "Lorem **ipsum** dolor sit amet",
      items: [
        { heading: "Lorem ipsum" },
        { heading: "Lorem ipsum" },
        { heading: "Lorem ipsum" },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    {
      type: "string",
      label: "Brow",
      name: "brow",
      description: "Small eyebrow text above the title.",
    },
    alternatingHeadingSchema,
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      description:
        "Optional intro text shown beneath the title. The intro stays on screen while the list scrolls (desktop).",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      type: "object",
      label: "Items",
      name: "items",
      list: true,
      description:
        "Unnumbered rows, for lists with no set order (e.g. what's covered). For step-by-step sequences use <V3> Process.",
      ui: {
        itemProps: (item) => ({ label: item?.heading ?? "Item" }),
        defaultItem: { heading: "Lorem ipsum" },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "heading",
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
          toolbarOverride: ["bold", "italic", "link"],
        },
      ],
    },
  ],
};
