import type { Collection } from "tinacms";

import { ratingSchema } from "../../components/util/consulting/rating";
import { tipField } from "./shared-fields";

export const testimonialSchema: Collection = {
  label: "Testimonials",
  name: "testimonials",
  format: "mdx",
  path: "content/testimonials",
  fields: [
    tipField,
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
      required: false,
      // @ts-ignore
      uploadDir: () => "testimonialAvatars",
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
      ui: {
        itemProps: (item) => {
          return { label: item?.name ?? "Select your testimonial category" };
        },
      },
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
