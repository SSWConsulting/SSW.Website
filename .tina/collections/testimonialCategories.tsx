import type { Collection } from "tinacms";
import { tipField } from "./shared-fields";

export const testimonialCategoriesSchema: Collection = {
  label: "Testimonials - Categories",
  name: "testimonialCategories",
  format: "mdx",
  path: "content/testimonialCategories",
  fields: [
    tipField,
    {
      type: "string",
      label: "Name",
      name: "name",
      required: true,
      isTitle: true,
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
  ],
};
