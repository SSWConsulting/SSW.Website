import * as Schemas from "../../components/blocks";
import { Collection } from "tinacms";
import { seoSchema } from "../../components/util/seo";

export const employmentSchema: Collection = {
  label: "Employment Pages",
  name: "employment",
  format: "mdx",
  path: "content/employment",
  ui: {
    router: ({ document }) => {
      return "/employment";
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
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
          type: "string",
          label: "Button Text",
          name: "buttonText",
        },
        {
          type: "image",
          label: "Video Background",
          name: "videoBackground",
        },
      ],
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "rich-text",
      label: "After body",
      name: "afterBody",
      templates: [...Schemas.pageBlocks],
    },
    {
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
    },
    {
      type: "rich-text",
      label: "After benefits body",
      name: "benefitsBody",
      templates: [...Schemas.pageBlocks],
    },
  ],
};
