import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { trainingHeaderSchema } from "../../components/training/trainingHeader";
import { seoSchema } from "../../components/util/seo";
import { videoCardSchema } from "../../components/util/videoCards";
import { testimonialRowSchema } from "../../components/testimonials/TestimonialRow";

export const trainingSchema: Collection = {
  label: "Training Pages",
  name: "training",
  format: "mdx",
  path: "content/training",
  ui: {
    router: ({ document }) => {
      return `/training/${document._sys.filename}`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    // @ts-ignore
    trainingHeaderSchema,
    // @ts-ignore
    testimonialRowSchema,
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "boolean",
      name: "showTestimonials",
      label: "Show Testimonials",
    },
    {
      type: "object",
      list: true,
      name: "_body",
      label: "Body",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      name: "footer",
      label: "Footer",
      templates: [...Schemas.pageBlocks],
    },
    // @ts-ignore
    videoCardSchema,
  ],
};
