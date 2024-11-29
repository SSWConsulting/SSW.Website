import { Template } from "tinacms";
import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { buttonOptions } from "../sharedTinaFields/colourOptions/buttonOptions";
import { ColorPickerInput } from "../sharedTinaFields/colourSelector";
import { IconPickerInput } from "../sharedTinaFields/iconSelector";
import { IconLabelSchema } from "./iconLabel";
import { listItemSchema } from "./listItem";

export const ImageTextBlockSchema: Template = {
  name: "imageTextBlock",
  label: "Image Text Block",
  ui: {
    previewSrc: "/images/thumbs/tina/client-logos.jpg",
    defaultItem: {
      backgroundColor: "Transparent",
    },
  },
  fields: [
    {
      type: "number",
      label: "Background Colour",
      name: "background",
      ui: {
        //@ts-expect-error – custom component typing won't be pinned down
        component: ColorPickerInput(backgroundOptions),
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
    {
      type: "object",
      label: "Top Label",
      name: "topLabel",
      description: "Add a label 'chip' to the top of the media text block.",
      //@ts-expect-error – fields are not being recognized
      fields: IconLabelSchema,
    },
    {
      type: "string",
      label: "Heading",
      name: "heading",
      description: "Heading text for the media text block.",
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      description: "Main body text for the block.",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      name: "featureColumns",
      label: "Feature Columns",
      description:
        "Add a grid of text-icon components to the media text block.",
      type: "object",
      fields: [
        {
          type: "boolean",
          label: "Two Columns",
          name: "twoColumns",
          description: "Split the list into two columns.",
        },
        {
          list: true,
          type: "object",
          label: "Features",
          name: "features",
          description: "Add an item to the the feature columns.",
          //@ts-expect-error – fields are not being recognized
          fields: listItemSchema,
          ui: {
            defaultItem: {
              heading: "Lorem",
              description: "Ipsum",
            },
          },
        },
      ],
    },
    {
      name: "chips",
      label: "Chips",
      type: "object",
      description: "Add chips to the bottom of the media text block.",
      fields: [
        {
          type: "string",
          label: "Filled Chip",
          name: "filledChipText",
          description: "Text for the filled chip.",
        },
        {
          type: "string",
          label: "Clear Chip",
          name: "clearChipText",
          description: "Text for the clear chip.",
        },
      ],
    },
    {
      name: "buttons",
      label: "Button Row",
      type: "object",
      list: true,
      description: "A row of buttons. Max 2.",
      ui: {
        max: 2,
        defaultItem: {
          color: "Transparent",
        },
      },
      fields: [
        {
          type: "string",
          label: "Button Text",
          name: "buttonText",
        },
        {
          type: "string",
          label: "Button Link",
          name: "buttonLink",
        },
        {
          type: "string",
          label: "Icon",
          name: "icon",
          ui: {
            //@ts-expect-error – custom component typing won't be pinned down
            component: IconPickerInput,
          },
        },
        {
          type: "boolean",
          label: "Icon First",
          name: "iconFirst",
          description: "Place the icon to the left of the button text.",
        },
        {
          type: "number",
          label: "Colour",
          name: "colour",
          ui: {
            //@ts-expect-error – custom component typing won't be pinned down
            component: ColorPickerInput(buttonOptions),
          },
        },
      ],
    },
    {
      label: "Lead Capture Button",
      name: "leadCaptureButton",
      type: "object",
      description:
        "An input and button field that provides the user a Jot form to get in contact.",
      fields: [
        {
          type: "string",
          label: "Button Text",
          name: "buttonText",
          description: "Text for the button.",
        },
        {
          type: "string",
          label: "Input Placeholder Text",
          name: "inputPlaceholder",
          description: "Placeholder text for the input field.",
        },
      ],
    },
  ],
};
