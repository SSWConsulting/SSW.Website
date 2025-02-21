import tabletTextAlignmentField from "@/components/blocksSubtemplates/tabletTextAlignment.schema";
import { Template, TinaField } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { ImageComponentLayoutSchema } from "../ImageComponentLayoutSchema";

export const AccordionSchema: Template = {
  name: "accordionBlock",
  label: "<V2> Accordion",
  ui: {
    previewSrc: "/images/thumbs/tina/accordion.png",
    defaultItem: {
      heading: "Lorem Ipsum",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      accordionItems: [
        {
          label: "Lorem",
          content: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  },
                ],
              },
            ],
          },
        },
        {
          label: "Ipsum",
          content: {
            type: "root",
            children: [
              {
                type: "p",
                children: [
                  {
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                  },
                ],
              },
            ],
          },
        },
      ],
      buttons: [
        {
          buttonText: "Lorem Ipsum",
          colour: 0,
        },
        {
          buttonText: "Dolor Sit",
          colour: 1,
        },
      ],
    },
  },
  fields: [
    alternatingHeadingSchema,
    {
      type: "boolean",
      label: "Use as H1",
      name: "isH1",
      description: "Choose to use the heading as an H1 instead of an H2.",
    },
    {
      type: "string",
      label: "Body",
      name: "body",
      description: "Flavour text under the block title.",
    },
    tabletTextAlignmentField as TinaField,
    {
      type: "object",
      label: "Accordion",
      name: "accordionItems",
      description: "The accordion (collapsable) portion of the block.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label ?? "Accordion" };
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
          description: "Label for the accordion item.",
        },
        {
          type: "rich-text",
          label: "Content",
          name: "content",
          description: "Content/description text for the accordion item.",
          toolbarOverride: ["bold", "italic", "link"],
        },
      ],
    },
    {
      type: "boolean",
      label: "Multiple Accordion Items Open Simultaneously",
      name: "isMultipleOpen",
      description: "Allow multiple accordion items to be open at once.",
    },
    {
      name: "buttons",
      label: "Button Row",
      type: "object",
      list: true,
      description: "A row of buttons. Max 2.",
      ui: {
        defaultItem: {
          buttonText: "Lorem Ipsum",
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
  ],
};
