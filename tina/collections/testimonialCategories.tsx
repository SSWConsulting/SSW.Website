import type { Collection } from "tinacms";
import { kebabCaseFilename, tipField } from "./shared-fields";

export const testimonialCategoriesSchema: Collection = {
  label: "Testimonials - Categories",
  name: "testimonialCategories",
  format: "mdx",
  path: "content/testimonialCategories",
  ui: {
    ...kebabCaseFilename,
  },
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
