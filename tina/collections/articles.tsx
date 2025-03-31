import { articlesIndexSchemaConstants } from "@/components/articles/articlesHeader";
import type { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { carouselBlockSchema } from "../../components/blocks/carousel.schema";
import { colorBlockSchema } from "../../components/blocks/colorBlock";
import { colorPaletteSchema } from "../../components/blocks/colorPalette";
import { customDownloadButtonSchema } from "../../components/blocks/CustomDownloadButton";
import { customImageBlockSchema } from "../../components/blocks/customImage";
import { dynamicCardGridBlockSchema } from "../../components/blocks/dynamicCardGridBlock";
import { fixedColumnsSchema } from "../../components/blocks/fixedColumns";
import { sectionHeaderSchema } from "../../components/blocks/sectionHeader";
import { tableBlockSchema } from "../../components/blocks/tableLayout";
import { testimonialsListSchema } from "../../components/blocks/testimonialsList";
import { verticalImageLayoutBlockSchema } from "../../components/blocks/verticalImageLayout";
import { videoEmbedBlockSchema } from "../../components/blocks/videoEmbed.schema";
import { utilityButtonSchema } from "../../components/button/utilityButton";
import {
  callToActionDefaults,
  callToActionSchema,
} from "../../components/callToAction/callToAction";
import { seoSchema } from "../../components/util/seo";
import { sidebarPanelSchema } from "../../components/util/sidebarPanel";
import { tipField } from "./shared-fields";

export const articlesSchema: Collection = {
  label: "Articles - Pages",
  name: "articles",
  format: "mdx",
  path: "content/articles/",
  defaultItem: () => {
    return {
      ...callToActionDefaults,
      sidebarPanel: {
        title: "2-Day Pre-Migration Assessment Engagement",
        description:
          "Get a solid foundation for your .NET 8 migration project, ensuring you are well-prepared to tackle the migration with confidence.",
        actionUrl: "/",
        actionText: "Learn more",
        showSidebarPanel: true,
      },
    };
  },
  match: {
    exclude: "@(case-study|index|clientCategories)/*",
  },
  ui: {
    router: ({ document }) => {
      return `/articles/${document._sys.filename}`;
    },
  },
  fields: [
    tipField,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "image",
      name: "bannerImg",
      label: "Banner Image",
      required: false,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "articles",
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
      type: "reference",
      name: "author",
      label: "Author",
      description:
        "if you cannot see the Author here add them to 'Events - Presenters' in the list",
      collections: ["presenter"],
    },

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sidebarPanelSchema,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    {
      ...callToActionSchema,

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        ...callToActionSchema.fields,
      ],
    },
  ],
};

export const articlesIndexSchema: Collection = {
  label: "Articles - Index",
  name: articlesIndexSchemaConstants.value,
  format: "mdx",
  path: "content/articles/index",
  ui: {
    router: () => {
      return "/articles";
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
      name: articlesIndexSchemaConstants.headerImage.value,
      fields: [
        {
          type: "image",
          label: "Hero Background",
          name: articlesIndexSchemaConstants.headerImage.heroBackground,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "background",
        },
        {
          type: "string",
          label: "Alt Text",
          name: articlesIndexSchemaConstants.headerImage.altText,
        },
        {
          type: "string",
          label: "Text Overlay",
          name: articlesIndexSchemaConstants.headerImage.txtOverlay,
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
      name: articlesIndexSchemaConstants.title,
    },
    {
      type: "rich-text",
      label: "Body",
      name: articlesIndexSchemaConstants._body,
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
    {
      type: "boolean",
      name: "showSidebarPanel",
      label: "Show Sidebar Panel",
      required: false,
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    sidebarPanelSchema,
  ],
};
export const clientsCategorySchema: Collection = {
  label: "Articles - Client Categories",
  name: "clientCategories",
  path: "content/articles/clientCategories",
  format: "json",
  fields: [
    {
      type: "string",
      label: "Name",
      name: "name",
    },
  ],
};
