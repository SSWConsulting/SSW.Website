import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3CtaSchema: Template = {
  name: "v3Cta",
  label: "<V3> CTA",
  ui: {
    defaultItem: {
      background: {
        backgroundColour: 7,
        redGlow: true,
        gridOverlay: true,
      },
      heading: "Let's build something **you're proud of.**",
      description:
        "Get in touch and we'll set up an initial meeting to show you where we'd start.",
      buttons: [{ buttonText: "Book your initial meeting", colour: 0 }],
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
        defaultItem: { buttonText: "Book your initial meeting" },
        max: 2,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
  ],
};
