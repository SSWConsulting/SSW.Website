import * as Schemas from "../../components/blocks";
import global from '../../content/global/index.json';

import {
  bookingButtonSchema,
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

import { title } from "process";
import type { Collection } from "tinacms";
import { dynamicCardGridBlockSchema } from "../../components/blocks/dynamicCardGridBlock";
import { callToActionSchema } from "../../components/callToAction/callToAction";

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
  defaultItem: () => {return { callToAction: {
    title: "Talk to us about your project",
    buttonText: global.bookingButtonText,
    subTitle: "Connect with our Account Managers to discuss how we can help.",
    animated: true,
    buttonSubtitle: `or call ${global.bookingPhone}`,
    showCallToAction: true,
  },
  sidebarPanel: {
    title: "2-Day Pre-Migration Assessment Engagement",
    description: "Get a solid foundation for your .NET 8 migration project, ensuring you are well-prepared to tackle the migration with confidence.",
    actionUrl: "/",
    actionText: "Learn more",
    showSidebarPanel: true,
  }
}},
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
        ...callToActionSchema.fields,
        {
          type: "string",
          label: "Title",
          name: "title"
        },
      ],
    }
    
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
