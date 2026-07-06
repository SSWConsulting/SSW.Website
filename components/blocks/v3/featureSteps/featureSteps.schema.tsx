import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3FeatureStepsSchema: Template = {
  name: "v3FeatureSteps",
  label: "<V3> Feature Steps",
  ui: {
    defaultItem: {
      brow: "How it works",
      heading: "A **simple** process",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      steps: [
        { brow: "01", heading: "Discover" },
        { brow: "02", heading: "Build" },
        { brow: "03", heading: "Deliver" },
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
      description: "Intro body text shown beneath the title (full width).",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      type: "object",
      label: "Steps",
      name: "steps",
      list: true,
      description:
        "Numbered steps shown below the intro. Numbers auto-generate (01, 02, 03…).",
      ui: {
        itemProps: (item) => ({ label: item?.heading ?? "Step" }),
        defaultItem: { brow: "01", heading: "Step" },
      },
      fields: [
        {
          type: "string",
          label: "Brow",
          name: "brow",
          description: "Small label above the step title (e.g. 01).",
        },
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
