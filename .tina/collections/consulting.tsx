import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";
import { testimonialRowSchema } from "../../components/testimonials/TestimonialRow";
import { benefitsFields } from "./shared-fields";

export const consultingIndexSchema: Collection = {
  label: "Consulting - Index",
  name: "consultingIndex",
  path: "content/consulting/index",
  format: "json",
  ui: {
    router: ({ document }) => {
      return "/consulting";
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Sidebar",
      name: "sidebar",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "reference",
          label: "Associated Tag",
          name: "tag",
          collections: ["consultingTag"],
        },
      ],
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.category?.split("/")[3].replace(".json", "") };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["consultingCategory"],
        },
        {
          type: "object",
          label: "Pages",
          name: "pages",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.title };
            },
          },
          fields: [
            {
              type: "string",
              label: "Title",
              name: "title",
            },
            {
              type: "string",
              label: "Description",
              name: "description",
              ui: {
                component: "textarea",
              },
            },
            {
              type: "image",
              label: "Logo",
              name: "logo",
              // @ts-ignore
              uploadDir: () => "/thumbs",
            },
            {
              type: "reference",
              label: "Page",
              name: "page",
              collections: ["consulting"],
              required: true,
            },
            {
              type: "string",
              label: "External URL",
              description:
                "Takes precedence over page if selected. If using this, you still have to select a (random) page.",
              name: "externalUrl",
            },
            {
              type: "object",
              label: "Tags",
              name: "tags",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.tag };
                },
              },
              fields: [
                {
                  type: "reference",
                  label: "Tag",
                  name: "tag",
                  collections: ["consultingTag"],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const consultingCategorySchema: Collection = {
  label: "Consulting - Categories",
  name: "consultingCategory",
  path: "content/consulting/category",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};

export const consultingTagSchema: Collection = {
  label: "Consulting - Tags",
  name: "consultingTag",
  path: "content/consulting/tag",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};

export const consultingSchema: Collection = {
  label: "Consulting Pages",
  name: "consulting",
  format: "mdx",
  path: "content/consulting",
  ui: {
    router: ({ document }) => {
      return `/consulting/${document._sys.filename}`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    // @ts-ignore
    testimonialRowSchema,
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
          // @ts-ignore
          uploadDir: () => "/videos",
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
          fields: benefitsFields,
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
