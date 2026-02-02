import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";
import { kebabCaseFilename, tipField } from "./shared-fields";

export const videoProductionSchema: Collection = {
  label: "Consulting - Video Production - Pages",
  name: "videoProduction",
  format: "mdx",
  path: "content/video-production",
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      return `/consulting/video-production/${document._sys.filename}`;
    },
  },
  fields: [
    tipField,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
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
      type: "string",
      label: "Call to Action",
      description:
        "Technology title inserted via {{TITLE}}. E.g. 'Talk to us about your {{TITLE}} project'",
      name: "callToAction",
      required: false,
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
  ],
};
