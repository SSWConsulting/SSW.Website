import { Template } from "tinacms";
import { buttonSchema } from "../../../button/templateButtonSchema";
import { ImageComponentLayoutSchema } from "../ImageComponentLayoutSchema";
import { fadeInSchema } from "../imageTextBlock/v2ComponentWrapper";

export const AccordionSchema: Template = {
  name: "accordionBlock",
  label: "Accordion",
  // ui: {
  //   previewSrc: "/images/thumbs/tina/accordian.jpg",
  // },
  fields: [
    {
      type: "string",
      label: "Heading",
      name: "heading",
      description: "Heading text for the block.",
    },
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
