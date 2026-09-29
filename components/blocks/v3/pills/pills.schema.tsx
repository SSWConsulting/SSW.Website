import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3PillsSchema: Template = {
  name: "v3Pills",
  label: "<V3> Pills",
  ui: {
    defaultItem: {
      background: { backgroundColour: 7 },
      brow: "TECH WE USE",
      heading: "AI Models We Work With",
      pills: [{ label: "Claude" }, { label: "ChatGPT" }, { label: "Gemini" }],
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
      type: "string",
      label: "Subtitle",
      name: "subtitle",
      description: "Optional short line beneath the title.",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      label: "Pills",
      name: "pills",
      list: true,
      description: "Labels shown as a wrapping row of pills.",
      ui: {
        itemProps: (item) => ({ label: item?.label ?? "Pill" }),
        defaultItem: { label: "Lorem" },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "image",
          label: "Image",
          name: "image",
          description: "Optional. Shown to the left of the label.",
        },
        {
          type: "string",
          label: "Image Alt Text",
          name: "imageAlt",
          description: "Defaults to the label.",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
          description:
            "Optional. If set, the pill becomes clickable. Use a relative path (e.g. /consulting) for internal links or a full URL (https://…) for external ones.",
        },
        {
          type: "boolean",
          label: "Open in New Tab",
          name: "newTab",
        },
      ],
    },
  ],
};
