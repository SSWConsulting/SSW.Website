import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { ColorPickerInput } from "../sharedTinaFields/colourSelector";

export const ImageComponentLayoutSchema = [
  {
    type: "number",
    label: "Background Colour",
    name: "background",
    ui: {
      component: ColorPickerInput(backgroundOptions),
    },
  },
  {
    type: "object",
    label: "Media",
    name: "mediaConfiguration",
    description: "Media configuration including layout and image upload.",
    ui: {
      defaultItem: {
        placement: "Right",
      },
    },
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
          options: ["Left", "Right"],
        },
      },
      {
        type: "string",
        label: "Media placement (vertical)",
        name: "verticalPlacement",
        description: "Where the image sits vertically in desktop view",
        ui: {
          component: "select",
          options: ["Centered", "Top", "Bottom"],
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
];
