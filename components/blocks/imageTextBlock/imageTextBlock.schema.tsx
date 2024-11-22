import { Template } from "tinacms";
import { ColorPickerInput } from "../sharedTinaFields/colourSelector";

export const ImageTextBlockSchema: Template = {
  name: "mediaTextBlock",
  label: "Media Text Block",
  ui: {
    previewSrc: "/images/thumbs/tina/client-logos.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Background Colour",
      name: "backgroundColor",
      ui: {
        //@ts-expect-error – custom component typing won't be pinned down
        component: ColorPickerInput,
      },
    },
    {
      type: "object",
      label: "Media",
      name: "mediaConfuguration",
      description: "Media configuration including layout and image upload.",
      fields: [
        {
          type: "string",
          label: "Media Placement",
          name: "placement",
          description:
            "Choose the desktop (columned) layout for the media text block.",
          default: "Right",
          ui: {
            component: "select",
            //@ts-expect-error – options are not being recognized
            options: ["Left", "Right"],
          },
        },
        {
          type: "string",
          label: "Media Placement (mobile)",
          name: "mobilePlacement",
          description:
            "Choose the mobile (stacked) layout for the media text block.",
          default: "Above Text",
          ui: {
            component: "select",
            //@ts-expect-error – options are not being recognized
            options: [
              {
                label: "Above Text",
                value: "Above",
              },
              {
                label: "Below Text",
                value: "Below",
              },
            ],
          },
        },
        {
          type: "image",
          label: "Image Source",
          name: "imageSource",
          description:
            "Upload an image or other media to display in the media text block.",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description: "Add alt text for the image.",
        },
      ],
    },
  ],
};
