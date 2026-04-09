import * as Schemas from "../../components/blocks";

import { carouselBlockSchema } from "../../components/blocks/carousel.schema";
import { fixedColumnsSchema } from "../../components/blocks/fixedColumns";
import { sectionHeaderSchema } from "../../components/blocks/sectionHeader";
import { tableBlockSchema } from "../../components/blocks/tableLayout";
import { testimonialsListSchema } from "../../components/blocks/testimonialsList";
import { verticalImageLayoutBlockSchema } from "../../components/blocks/verticalImageLayout";

import { videoEmbedBlockSchema } from "../../components/blocks/videoEmbed.schema";
import { microsoftPanelSchema } from "../../components/offices/microsoftPanel";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename } from "./shared-fields";

import { companyIndexSchemaConstants } from "@/components/company/companyHeader";
import type { Collection } from "tinacms";
import { colorBlockSchema } from "../../components/blocks/colorBlock";
import { colorPaletteSchema } from "../../components/blocks/colorPalette";
import { customDownloadButtonSchema } from "../../components/blocks/CustomDownloadButton";
import { customImageBlockSchema } from "../../components/blocks/customImage";
import { dynamicCardGridBlockSchema } from "../../components/blocks/dynamicCardGridBlock";
import { utilityButtonSchema } from "../../components/button/utilityButton";
import { testimonialToSelectOptions } from "../../helpers/getTestimonials";

export const companySchema: Collection = {
  label: "Company - Pages",
  name: "company",
  format: "mdx",
  path: "content/company/",
  match: {
    exclude: "@(case-study|index|clientCategories)/*",
  },
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      return `/company/${document._sys.filename}`;
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      list: true,
      name: "beforeBody",
      label: "Before body",
      ui: {
        visualSelector: true,
      },
      templates: [carouselBlockSchema],
    },
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "rich-text",
      name: "subTitle",
      label: "Body",
      templates: [
        carouselBlockSchema,
        colorBlockSchema,
        colorPaletteSchema,
        customDownloadButtonSchema,
        customImageBlockSchema,
        dynamicCardGridBlockSchema,
        fixedColumnsSchema,
        sectionHeaderSchema,
        tableBlockSchema,
        testimonialsListSchema,
        utilityButtonSchema,
        verticalImageLayoutBlockSchema,
        videoEmbedBlockSchema,
      ],
    },
    {
      type: "boolean",
      name: "fullWidthBody",
      label: "Full Width Body",
    },
    {
      type: "rich-text",
      name: "sidebar",
      label: "Sidebar",
      required: false,
      templates: [microsoftPanelSchema],
    },
    {
      type: "boolean",
      name: "hideSidebarOnMobile",
      label: "Hide sidebar on mobile",
    },
    {
      type: "boolean",
      name: "fixedWidthSidebar",
      label: "Fixed width sidebar",
    },
    {
      type: "string",
      name: "sidebarTestimonial",
      label: "Sidebar Testimonial",
      options: testimonialToSelectOptions(),
    },
    {
      type: "boolean",
      name: "showRdPanel",
      label: "Show Regional Director Panel",
      required: false,
    },
    {
      type: "boolean",
      name: "showTechUpgradeBlock",
      label: "Show Tech Upgrade Block",
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

export const companyIndexSchema: Collection = {
  label: "Company - Index",
  name: companyIndexSchemaConstants.value,
  format: "mdx",
  path: "content/company/index",
  ui: {
    router: () => {
      return "/company";
    },
    allowedActions: {
      create: false,
      delete: false,
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "background",
        },
      ],
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        {
          type: "boolean",
          label: "External Page",
          description:
            "Select this if the link is not part of the website. This includes SSW.Rules, and SSW.People links",
          name: companyIndexSchemaConstants.companyPages.isExternal,
        },
      ],
    },
  ],
};

export const clientsCategorySchema: Collection = {
  label: "Company - Client Categories",
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
