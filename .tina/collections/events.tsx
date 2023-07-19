import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { testimonialRowSchema } from "../../components/testimonials/TestimonialRow";
import { trainingHeaderSchema } from "../../components/training/trainingHeader";
import { seoSchema } from "../../components/util/seo";
import { videoCardSchema } from "../../components/util/videoCards";

export const eventsSchema: Collection = {
  label: "Events Pages",
  name: "events",
  format: "mdx",
  path: "content/events",
  ui: {
    router: ({ document }) => {
      console.log(document);
      return `/events/${document._sys.filename}`;
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
      name: "showBreadcrumb",
      label: "Show Breadcrumb",
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
