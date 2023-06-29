import type { Collection } from "tinacms";

import { ratingSchema } from "../../components/util/consulting/rating";

export const testimonialSchema: Collection = {
  label: "Testimonials",
  name: "testimonials",
  format: "mdx",
  path: "content/testimonials",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true,
    },
    {
      type: "image",
      label: "Avatar",
      name: "avatar",
      required: true,
    },
    {
      type: "string",
      label: "Company",
      name: "company",
      required: false,
    },
    {
      ...ratingSchema,
      required: true,
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
    {
      type: "object",
      label: "Categories",
      name: "categories",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Category",
          name: "category",
          collections: ["testimonialCategories"],
        },
      ],
    },
  ],
};
