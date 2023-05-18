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
      type: "object",
      label: "Solution",
      name: "solution",
      fields: [
        {
          type: "string",
          label: "Project",
          name: "project",
        },
      ],
    },
    {
      type: "string",
      label: "Call to Action",
      description:
        'Technology title inserted via {{TITLE}}. E.g. "Talk to us about your {{TITLE}} project"',
      name: "callToAction",
      required: false,
    },
    {
      type: "object",
      label: "Testimonial Categories",
      name: "testimonialCategories",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Testimonial Category",
          name: "testimonialCategory",
          collections: ["testimonialCategories"],
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
      type: "object",
      list: true,
      name: "afterBody",
      label: "After body",
      ui: {
        visualSelector: true,
      },
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
      type: "object",
      label: "Technologies",
      name: "technologies",
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header",
        },
        {
          type: "string",
          label: "Subheading",
          name: "subheading",
        },
        {
          type: "object",
          label: "Technology Cards",
          name: "technologyCards",
          ui: {
            itemProps: (item) => ({
              label: item?.technologyCard,
            }),
          },
          list: true,
          fields: [
            {
              type: "reference",
              label: "Technology Card",
              name: "technologyCard",
              collections: ["technologies"],
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Media cards",
      name: "medias",
      fields: [
        {
          type: "string",
          label: "Header",
          name: "header",
        },
        {
          type: "object",
          label: "Media Cards",
          name: "mediaCards",
          list: true,
          fields: [
            {
              type: "string",
              label: "Type",
              name: "type",
              options: [
                {
                  value: "video",
                  label: "Video",
                },
                {
                  value: "blog",
                  label: "Blog",
                },
              ],
            },
            {
              type: "rich-text",
              label: "Content",
              name: "content",
            },
          ],
        },
      ],
    },
  ],
};
