import { Template } from "tinacms";
import { fadeInSchema } from "../../../components/layout/v2ComponentWrapper";
import { buttonSchema } from "../../button/templateButtonSchema";
import { backgroundOptions } from "../sharedTinaFields/colourOptions/blockBackgroundOptions";
import { ColorPickerInput } from "../sharedTinaFields/colourSelector";
import { IconLabelSchema } from "./iconLabel";
import { listItemSchema } from "./listItem.schema";
import { pillGroupSchema } from "./pillGroup";

export const ImageTextBlockSchema: Template = {
  name: "imageTextBlock",
  label: "Image Text Block",
  ui: {
    previewSrc: "/images/thumbs/tina/client-logos.jpg",
    defaultItem: {
      backgroundColor: "Transparent",
      topLabel: {
        labelText: "Lorem Ipsum",
      },
      heading: "Lorem Ipsum",
      isH1: false,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      chips: {
        filledChipText: "Lorem",
        clearChipText: "Ipsum",
      },
      featureColumns: {
        twoColumns: true,
        features: [
          {
            heading: "Lorem",
            description: "Ipsum dolor sit amet, consectetur adipiscing elit.",
          },
          {
            heading: "Ipsum",
            description: "Lorem dolor sit amet, consectetur adipiscing elit.",
          },
        ],
      },
      buttons: [
        {
          colour: 0,
          buttonText: "Lorem Ipsum",
        },
        {
          colour: 1,
          buttonText: "Dolor Sit",
        },
      ],
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
      type: "boolean",
      label: "Use as H1",
      name: "isH1",
      description: "Choose to use the heading as an H1 instead of an H2.",
    },
    {
      type: "rich-text",
      label: "Description",
      name: "description",
      description: "Main body text for the block.",
      toolbarOverride: ["bold", "italic", "link"],
    },
    {
      name: "chips",
      label: "Chips",
      type: "object",
      description: "Add chips to the bottom of the media text block.",
      //@ts-expect-error – fields are not being recognized
      fields: pillGroupSchema,
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
              heading: "{{ HEADING }}",
              description: "{{ DESCRIPTION }}",
            },
          },
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
        defaultItem: {
          buttonText: "{{ TEXT }}",
        },
        max: 2,
        itemProps(item) {
          return { label: `${item.buttonText}` };
        },
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
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
            //@ts-expect-error – options are not being recognized
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
            //@ts-expect-error – options are not being recognized
            options: ["Top", "Centered", "Bottom"],
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
    //@ts-expect-error – fields are not being recognized
    fadeInSchema,
  ],
};
