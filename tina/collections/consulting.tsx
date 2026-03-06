import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import {
  callToActionDefaults,
  callToActionSchema,
} from "../../components/callToAction/callToAction";
import { testimonialRowSchema } from "../../components/testimonials/TestimonialRow";
import { seoSchema } from "../../components/util/seo";
import { benefitsFields, kebabCaseFilename } from "./shared-fields";

export const consultingIndexSchema: Collection = {
  label: "Consulting - Index",
  name: "consultingIndex",
  path: "content/consulting/index",
  format: "json",
  ui: {
    router: () => {
      return "/consulting";
    },
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              uploadDir: () => "thumbs",
            },
            {
              type: "reference",
              label: "Page",
              name: "page",
              collections: ["consulting", "consultingv2"],
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
  label: "Consulting - Pages",
  name: "consulting",
  format: "mdx",
  path: "content/consulting",
  defaultItem: callToActionDefaults,
  ui: {
    router: ({ document }) => {
      return `/consulting/${document._sys.filename}`;
    },
    ...kebabCaseFilename,
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "videos",
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
      ...callToActionSchema,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Title",
          description:
            "Technology title inserted via {{TITLE}}. E.g. 'Talk to us about your {{TITLE}} project'",
          name: "title",
          required: false,
        },
        ...callToActionSchema.fields,
      ],
    },
    {
      type: "object",
      label: "Testimonial Categories",
      name: "testimonialCategories",
      ui: {
        itemProps(item) {
          return {
            label:
              item.testimonialCategory ?? "Select your testimonial category",
          };
        },
      },
      list: true,
      fields: [
        {
          type: "reference",
          label: "Testimonial Category",
          name: "testimonialCategory",
          collections: ["testimonialCategories"],
          required: true,
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
