import * as Schemas from "../../components/blocks";
import { videoEmbedBlockSchema } from "../../components/blocks/videoEmbed";
import { microsoftPanelSchema } from "../../components/offices/microsoftPanel";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

export const companySchema: Collection = {
  label: "Company Pages",
  name: "company",
  format: "mdx",
  path: "content/company/",
  match: {
    exclude: "index/**/**",
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
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "rich-text",
      name: "subTitle",
      label: "Body",
      templates: [videoEmbedBlockSchema],
    },
    {
      type: "rich-text",
      name: "sidebar",
      label: "Sidebar",
      required: false,
      templates: [microsoftPanelSchema],
    },
    {
      type: "reference",
      name: "sidebarTestimonial",
      label: "Sidebar Testimonial",
      collections: ["testimonials"],
    },
    {
      type: "boolean",
      name: "showRdPanel",
      label: "Show Regional Director Panel",
      required: false,
    },
    {
      type: "object",
      list: true,
      name: "_body",
      label: "Blocks",
      templates: [...Schemas.pageBlocks],
      ui: {
        visualSelector: true,
      },
    },
    {
      type: "object",
      label: "History Cards",
      description: "Cards for the timeline on the History page.",
      name: "historyCards",
      ui: {
        itemProps: (item) => {
          return { label: item?.year };
        },
      },
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

export const companyIndexSchemaConstants = {
  value: "companyIndex",
  title: "title",
  headerImage: {
    value: "headerImage",
    heroBackground: "heroBackground",
    altText: "altText",
    txtOverlay: "txtOverlay",
  },
  _body: "_body",
  companyPages: {
    value: "companyPages",
    title: "title",
    body: "body",
    pageURL: "pageURL",
  },
};

export const companyIndexSchema: Collection = {
  label: "Company - Index",
  name: companyIndexSchemaConstants.value,
  format: "mdx",
  path: "content/company/index",
  ui: {
    router: () => {
      return `/company`;
    },
  },
  fields: [
    {
      type: "object",
      label: "Header Image",
      name: companyIndexSchemaConstants.headerImage.value,
      fields: [
        {
          type: "image",
          label: "Hero Background",
          name: companyIndexSchemaConstants.headerImage.heroBackground,
          // @ts-ignore
          uploadDir: () => "background",
        },
        {
          type: "string",
          label: "Alt Text",
          name: companyIndexSchemaConstants.headerImage.altText,
        },
        {
          type: "string",
          label: "Text Overlay",
          name: companyIndexSchemaConstants.headerImage.txtOverlay,
          // @ts-ignore
          uploadDir: () => "background",
        },
      ],
    },
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      label: "Title",
      name: companyIndexSchemaConstants.title,
    },
    {
      type: "rich-text",
      label: "Body",
      name: companyIndexSchemaConstants._body,
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "object",
      label: "Pages",
      description: "Cards for the timeline on the History page.",
      name: companyIndexSchemaConstants.companyPages.value,
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
          name: companyIndexSchemaConstants.companyPages.title,
        },
        {
          type: "rich-text",
          label: "Body",
          name: companyIndexSchemaConstants.companyPages.body,
        },
        {
          type: "string",
          label: "Page URL",
          name: companyIndexSchemaConstants.companyPages.pageURL,
        },
      ],
    },
  ],
};

export const clientsCategorySchema: Collection = {
  label: "Company - Client categories",
  name: "clientCategories",
  path: "content/company/clientCategories",
  format: "json",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};
