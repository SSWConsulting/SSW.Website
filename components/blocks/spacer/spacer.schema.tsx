import { wrapperBaseFields } from "@/components/layout/v2ComponentWrapper.schema";
import type { Template } from "tinacms";

export const SpacerSchema: Template = {
  name: "spacer",
  label: "<V2> Spacer",
  ui: {
    previewSrc: "/images/thumbs/tina/spacer.png",
    defaultItem: {
      spacerHeight: "50px",
      background: {
        backgroundColour: 4,
        backgroundImage: "",
        bleed: false,
      },
    },
  },
  fields: [
    {
      name: "spacerHeight",
      label: "Height",
      type: "string",
      description: "Enter the height (e.g., 50px, 2rem, 10vh)",
    },
    ...wrapperBaseFields,
  ],
};
