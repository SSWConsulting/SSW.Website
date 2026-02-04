import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { eventsHeaderSchema } from "../../components/events/eventsHeader";
import { testimonialRowSchema } from "../../components/testimonials/TestimonialRow";
import { seoSchema } from "../../components/util/seo";
import { videoCardSchema } from "../../components/util/videoCards.schema";
import { kebabCaseFilename } from "./shared-fields";

export const eventsSchema: Collection = {
  label: "Events - Pages",
  name: "events",
  format: "mdx",
  path: "content/events",
  match: {
    exclude: "index/**/**",
  },
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      return `/events/${document._sys.filename}`;
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    eventsHeaderSchema,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    testimonialRowSchema,
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "rich-text",
      name: "subTitle",
      label: "Sub Title",
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
        },
      ],
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    videoCardSchema,
  ],
};

export const eventsIndexSchema: Collection = {
  label: "Events - Index",
  name: "eventsIndex",
  format: "mdx",
  path: "content/events/index",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
    router: () => {
      return "/events";
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      name: "preface",
      label: "Preface",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "rich-text",
      name: "sidebarBody",
      label: "Sidebar Body",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "object",
      list: true,
      name: "afterEvents",
      label: "After Events",
      ui: {
        visualSelector: true,
      },
      templates: [...Schemas.pageBlocks],
    },
  ],
};
