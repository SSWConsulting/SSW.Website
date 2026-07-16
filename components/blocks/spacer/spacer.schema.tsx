import { backgroundSchema } from "@/components/layout/v2ComponentWrapper.schema";
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
    {
      name: "hideOn",
      label: "Hide on",
      description:
        "Hide this spacer on the selected screen sizes (visible on all sizes by default).",
      type: "string",
      list: true,
      options: [
        { value: "mobile", label: "Mobile (< 768px)" },
        { value: "tablet", label: "Tablet (768–1024px)" },
        { value: "desktop", label: "Desktop (≥ 1024px)" },
      ],
    },
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
  ],
};
