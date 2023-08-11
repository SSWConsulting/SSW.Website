import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { eventsHeaderSchema } from "../../components/events/eventsHeader";
import { testimonialRowSchema } from "../../components/testimonials/TestimonialRow";
import { seoSchema } from "../../components/util/seo";
import { videoCardSchema } from "../../components/util/videoCards";

export const eventsSchema: Collection = {
  label: "Events Pages",
  name: "events",
  format: "mdx",
  path: "content/events",
  match: {
    exclude: "index/**/**",
  },
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
    eventsHeaderSchema,
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
      return `/events`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      name: "sidebarBody",
      label: "Sidebar Body",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
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
