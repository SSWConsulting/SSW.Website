import React from "react";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

export const videoProductionSchema: Collection = {
  label: "Consulting - Video Production - Pages",
  name: "videoProduction",
  format: "mdx",
  path: "content/video-production",
  ui: {
    router: ({ document }) => {
      return `/consulting/video-production/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "tip",
      label: "Tip",
      ui: {
        component: ({}) => {
          return (
            <div>
              Please fill out all the required labels before navigating to
              another form.
            </div>
          );
        },
      },
    },
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
        'Technology title inserted via {{TITLE}}. E.g. "Talk to us about your {{TITLE}} project"',
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
