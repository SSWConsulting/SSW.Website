import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

export const companySchema: Collection = {
  label: "Company Pages",
  name: "company",
  format: "mdx",
  path: "content/company",
  match: {
    exclude: "index/**",
  },
  ui: {
    router: ({ document }) => {
      return `/company/${document._sys.filename}`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "object",
      label: "History Cards",
      description: "Cards for the timeline on the History page.",
      name: "historyCards",
      list: true,
      fields: [
        {
          type: "number",
          label: "Year",
          name: "year",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Location",
          name: "location",
          options: [
            {
              value: "Australia",
              label: "Australia",
            },
            {
              value: "France",
              label: "France",
            },
            {
              value: "China",
              label: "China",
            },
          ],
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
        },
      ],
    },
  ],
};

export const companyIndexSchema: Collection = {
  label: "Company - Index",
  name: "companyIndex",
  format: "mdx",
  path: "content/company/index",
  ui: {
    router: ({ document }) => {
      return `/company/`;
    },
  },
  fields: [
    {
      type: "object",
      label: "Header Image",
      name: "headerImage",
      fields: [
        {
          type: "image",
          label: "Hero Background",
          name: "heroBackground",
          // @ts-ignore
          uploadDir: () => "background",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
        },
        {
          type: "image",
          label: "Image Overlay",
          name: "imgOverlay",
          // @ts-ignore
          uploadDir: () => "background",
        },
      ],
    },
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "object",
      label: "Pages",
      description: "Cards for the timeline on the History page.",
      name: "companyPages",
      ui: {
        itemProps: (item) => {
          return { label: item?.title };
        },
      },
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Body",
          name: "body",
        },
        {
          type: "string",
          label: "Page URL",
          name: "pageURL",
        },
      ],
    },
  ],
};
