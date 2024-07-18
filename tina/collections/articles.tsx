import * as Schemas from "../../components/blocks";
import {
  carouselBlockSchema,
  colorBlockSchema,
  colorPaletteSchema,
  customDownloadButtonSchema,
  fixedColumnsSchema,
  sectionHeaderSchema,
  tableBlockSchema,
  testimonialsListSchema,
  verticalImageLayoutBlockSchema,
} from "../../components/blocks";
import { videoEmbedBlockSchema } from "../../components/blocks/videoEmbed";
import { seoSchema } from "../../components/util/seo";
import { sidebarPanelSchema } from "../../components/util/sidebarPanel";
import { tipField } from "./shared-fields";

import type { Collection } from "tinacms";
import { dynamicCardGridBlockSchema } from "../../components/blocks/dynamicCardGridBlock";

export const articlesIndexSchemaConstants = {
  value: "articlesIndex",
  title: "title",
  headerImage: {
    value: "headerImage",
    heroBackground: "heroBackground",
    altText: "altText",
    txtOverlay: "txtOverlay",
  },
  _body: "_body",
  articles: {
    value: "articles",
    title: "title",
    body: "body",
    pageURL: "pageURL",
    isExternal: "isExternal",
    userName: "userName",
    userPosition: "userPosition",
    userImage: "userImage",
  },
};

export const articlesSchema: Collection = {
  label: "Articles - Pages",
  name: "articles",
  format: "mdx",
  path: "content/articles/",
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
        Schemas.customImageBlockSchema,
        dynamicCardGridBlockSchema,
        fixedColumnsSchema,
        sectionHeaderSchema,
        tableBlockSchema,
        testimonialsListSchema,
        Schemas.utilityButtonSchema,
        verticalImageLayoutBlockSchema,
        videoEmbedBlockSchema,
      ],
    },
    {
      type: "reference",
      name: "author",
      label: "Presenter",
      description:
        'if you cannot see the Author here add them to "Presenters" in the list',
      collections: ["presenter"],
    },
    {
      type: "boolean",
      name: "fullWidthBody",
      label: "Full Width Body",
    },
    {
      type: "boolean",
      name: "hideSidebarOnMobile",
      label: "Hide sidebar on mobile",
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
    {
      type: "object",
      label: "Articles",
      description: "Articles",
      name: articlesIndexSchemaConstants.articles.value,
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
          name: articlesIndexSchemaConstants.articles.title,
          required: true,
        },
        {
          type: "rich-text",
          label: "Body",
          name: articlesIndexSchemaConstants.articles.body,
          required: true,
        },
        {
          type: "string",
          label: "Page URL",
          name: articlesIndexSchemaConstants.articles.pageURL,
          required: true,
        },
      ],
    },
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
