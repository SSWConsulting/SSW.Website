import { TinaField } from "tinacms";
import * as Schemas from "../../components/blocks";

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

export const bookingField: TinaField = {
  type: "object",
  label: "Booking",
  name: "booking",
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Subtitle",
      name: "subTitle",
    },
    {
      type: "rich-text",
      label: "Booking body",
      name: "bookingBody",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "image",
      label: "Video Background",
      name: "videoBackground",
      // @ts-ignore
      uploadDir: () => "/videos",
    },
  ],
};
