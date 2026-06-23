import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { IconPickerInput } from "../../../blocksSubtemplates/tinaFormElements/iconSelector";

export const V3VideoHighlightsSchema: Template = {
  name: "v3VideoHighlights",
  label: "<V3> Video Highlights",
  ui: {
    defaultItem: {
      heading: "Why choose **SSW**?",
      highlights: [
        { icon: "BiCube", title: "Deep expertise" },
        { icon: "BiTargetLock", title: "Results over rhetoric" },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    {
      type: "string",
      label: "Video URL",
      name: "videoUrl",
      description: "YouTube or Vimeo URL shown on the left with a play button.",
    },
    {
      type: "image",
      label: "Thumbnail Override",
      name: "thumbnail",
      description:
        "Optional. Overrides the video's poster image; falls back to the video's own thumbnail when empty.",
    },
    {
      type: "boolean",
      label: "Greyscale Thumbnail",
      name: "greyscaleThumbnail",
      description:
        "Show the thumbnail in greyscale. The video plays in full colour.",
    },
    {
      type: "string",
      label: "Figure Caption",
      name: "figure",
      description: "Optional caption shown beneath the video.",
    },
    {
      type: "string",
      label: "Brow",
      name: "brow",
      description: "Optional small eyebrow text above the title.",
    },
    alternatingHeadingSchema,
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      description: "Intro body text shown beneath the title.",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      type: "object",
      label: "Highlights",
      name: "highlights",
      list: true,
      description: "Icon + title + description columns shown beside the video.",
      ui: {
        itemProps: (item) => ({ label: item?.title ?? "Highlight" }),
        defaultItem: {
          icon: "BiCube",
          title: "Highlight title",
        },
      },
      fields: [
        // @ts-expect-error – Tina 3.8.x: custom ui.component type no longer matches Field
        {
          type: "string",
          label: "Icon",
          name: "icon",
          description: "Icon shown above the title.",
          ui: {
            component: IconPickerInput,
          },
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Description",
          name: "desc2",
          toolbarOverride: ["bold", "italic", "link"],
        },
        {
          type: "string",
          label: "Read More Link",
          name: "link",
          description:
            "Optional. If set, a link renders under the highlight.",
        },
        {
          type: "string",
          label: "Read More Link Text",
          name: "linkText",
          description:
            "Optional. Text shown for the link. Defaults to 'Read More'.",
        },
      ],
    },
  ],
};
