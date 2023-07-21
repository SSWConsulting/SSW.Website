import { TinaField } from "tinacms";

export const benefitsField: TinaField = {
  type: "object",
  label: "Benefits",
  name: "benefits",
  fields: [
    {
      type: "object",
      list: true,
      label: "benefit list",
      name: "benefitList",
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      fields: [
        {
          type: "image",
          label: "Image URL",
          name: "image",
          // @ts-ignore
          uploadDir: () => "/benefits",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          required: false,
          label: "linkName",
          name: "linkName",
        },
        {
          type: "string",
          required: false,
          label: "linkURL",
          name: "linkURL",
        },
      ],
    },
    {
      type: "object",
      label: "Rule",
      name: "rule",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
      ],
    },
  ],
};
