import type { Template } from "tinacms";

export const videoEmbedBlockSchema: Template = {
  name: "VideoEmbed",
  label: "Video Embed",
  ui: {
    previewSrc: "/blocks/videoEmbedContent.png",
  },
  fields: [
    {
      type: "string",
      label: "Video URL",
      name: "url",
      description:
        "Only YouTube and Vimeo URLs are supported. To embed videos from other sources, please raise an issue",
      required: true,
    },
    {
      type: "string",
      label: "Width",
      description: "Default is 75%",
      name: "videoWidth",
      required: false,
      options: [
        {
          value: "w-full",
          label: "100%",
        },
        {
          value: "w-3/4",
          label: "75%",
        },
        {
          value: "w-1/2",
          label: "50%",
        },
        {
          value: "w-1/4",
          label: "25%",
        },
      ],
    },
    {
      type: "boolean",
      label: "Remove margin",
      name: "removeMargin",
      required: false,
    },
    {
      type: "boolean",
      label: "Remove centre alignment",
      name: "uncentre",
    },
    {
      type: "boolean",
      label: "Overflow - read more at tailwindcss.com/docs/overflow",
      name: "overflow",
      required: false,
    },
    {
      type: "string",
      label: "Caption",
      name: "caption",
      description:
        "Shows up under the video as 'Video: {{ YOUR_INPUT }} ({{ YOUR_DURATION }})'. No full stop at the end. See https://ssw.com.au/rules/add-useful-and-concise-figure-captions/",
      required: false,
    },
    {
      type: "string",
      label: "Duration",
      name: "duration",
      description:
        "For example 30 sec, 4 min, 1 hr or 1 hr 26 min. See https://ssw.com.au/rules/right-format-to-write-videos-time-length",
    },
  ],
};
