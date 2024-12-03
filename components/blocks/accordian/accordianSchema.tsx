import { Template } from "tinacms";

export const AccordianSchema: Template = {
  name: "accordian",
  label: "Accordian",
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
      type: "string",
      label: "Content",
      name: "content",
      description: "Content/description text for the block.",
    },
    {
      type: "object",
      label: "Accordian",
      name: "accordians",
      description: "The accordian (collapsable) portion of the block.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.heading ?? "Accordian" };
        },
      },
      fields: [
        {
          type: "string",
          label: "Heading",
          name: "heading",
          description: "Heading text for the accordian.",
        },
        {
          type: "string",
          label: "Content",
          name: "content",
          description: "Content/description text for the accordian.",
        },
      ],
    },
  ],
};
