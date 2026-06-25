import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3ProcessSchema: Template = {
  name: "v3Process",
  label: "<V3> Process",
  ui: {
    defaultItem: {
      brow: "Lorem ipsum",
      heading: "Lorem **ipsum** dolor sit amet",
      steps: [
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
      description: "Optional intro body text shown beneath the title.",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      type: "object",
      label: "Steps",
      name: "steps",
      list: true,
      description:
        "Numbered process steps. The circled number auto-generates from order (01, 02, 03…).",
      ui: {
        itemProps: (item) => ({ label: item?.heading ?? "Step" }),
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
        {
          type: "string",
          label: "Link",
          name: "link",
          description:
            "Optional. If set, the whole step card becomes clickable. Use a relative path (e.g. /consulting) for internal links or a full URL (https://…) for external ones.",
        },
      ],
    },
  ],
};
