import { backgroundSchema } from "@/components/layout/v2ComponentWrapper";
import { Template } from "tinacms";

export const SpacerSchema: Template = {
  name: "spacer",
  label: "<V2> Spacer",
  ui: {
    previewSrc: "/images/thumbs/tina/spacer.png",
  },
  fields: [
    {
      name: "spacerHeight",
      label: "Height",
      type: "string",
      description: "Enter the height (e.g., 50px, 2rem, 10vh)",
    },
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
  ],
};
