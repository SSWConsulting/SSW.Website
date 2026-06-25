import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

// The form fields, screens and JotForm mapping are fixed — every use of this
// block submits to the same JotForm. The CMS only controls the intro copy and
// background; see leadCapture.tsx for the JotForm id / question-id mapping.
export const V3LeadCaptureSchema: Template = {
  name: "v3LeadCapture",
  label: "<V3> Lead Capture",
  ui: {
    defaultItem: {
      brow: "Get started",
      heading: "Let's find the **right** starting point",
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
      description: "Optional intro text shown above the form.",
      toolbarOverride: ["bold", "italic", "link"],
    },
  ],
};
