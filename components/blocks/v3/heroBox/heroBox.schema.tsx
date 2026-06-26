import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";

export const V3HeroBoxSchema: Template = {
  name: "v3HeroBox",
  label: "<V3> Hero Box",
  ui: {
    defaultItem: {
      background: {
        backgroundColour: 8,
        bleed: false,
      },
      heading: "Three decades of enterprise solutions",
      description:
        "We find the best way to build software and make that knowledge available to everyone.",
      buttons: [{ buttonText: "Schedule a Free Discovery Call", colour: 0 }],
      applyRedTint: true,
      showScrollIndicator: true,
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      description: "Supporting text shown beneath the heading.",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      type: "object",
      label: "Buttons",
      name: "buttons",
      list: true,
      description: "A row of buttons. Max 2.",
      ui: {
        defaultItem: { buttonText: "Schedule a Free Discovery Call" },
        max: 2,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
    {
      type: "object",
      label: "Background Image",
      name: "backgroundMedia",
      description:
        "The full-bleed image that fills the rounded hero box. A landscape image works best.",
      fields: [
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description: "Alt text for the background image.",
        },
        // @ts-expect-error – optimizedImageSchema's field types aren't recognised
        ...optimizedImageSchema(
          "Upload the background image for the hero box."
        ),
      ],
    },
    {
      type: "boolean",
      label: "Apply Red Tint",
      name: "applyRedTint",
      description:
        "Applies the SSW red duotone tint over the background image (as shown in the design).",
    },
    {
      type: "boolean",
      label: "Show Scroll Indicator",
      name: "showScrollIndicator",
      description:
        "Shows the circular scroll-down affordance in the bottom-right corner.",
    },
  ],
};
