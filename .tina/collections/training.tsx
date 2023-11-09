import React from "react";
import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { testimonialRowSchema } from "../../components/testimonials/TestimonialRow";
import { trainingHeaderSchema } from "../../components/training/trainingHeader";
import { seoSchema } from "../../components/util/seo";
import { videoCardSchema } from "../../components/util/videoCards";
import { tipField } from "./shared-fields";

export const trainingSchema: Collection = {
  label: "Training - Pages",
  name: "training",
  format: "mdx",
  path: "content/training",
  ui: {
    router: ({ document }) => {
      return `/training/${document._sys.filename}`;
    },
  },
  fields: [
    tipField,
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
