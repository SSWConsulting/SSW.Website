import { Template } from "tinacms";
import { buttonSchema } from "../../../button/templateButtonSchema";
import { ImageComponentLayoutSchema } from "../ImageComponentLayoutSchema";
import { IconLabelSchema } from "./iconLabel";
import { listItemSchema } from "./listItem-schema";
import { pillGroupSchema } from "./pillGroup";
import { fadeInSchema } from "./v2ComponentWrapper";

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
    //@ts-expect-error – fields are not being recognized
    ...ImageComponentLayoutSchema,
    //@ts-expect-error – fields are not being recognized
    fadeInSchema,
  ],
};
