import * as Schemas from "../../components/blocks";
import { joinGithubSchema } from "../../components/usergroup/joinGithub";
import { pageBlocks as sectionPageBlocks } from "../../components/usergroup/sections";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";
import { youtubePlaylistSchema } from "../../components/blocks/youtubePlaylist.schema";
import { joinAsPresenterSchema } from "../../components/usergroup/joinAsPresenter";
import { latestTechSchema } from "../../components/usergroup/latestTech";
import azureBannerSchema from "../../components/util/showAzureBanner";
import { tipField } from "./shared-fields";

export const userGroupPageSchema: Collection = {
  label: "User Groups - Pages",
  name: "userGroupPage",
  format: "mdx",
  path: "content/netug",
  match: {
    exclude: "global/**/**",
  },
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "index") {
        return "/netug";
      }
      return `/netug/${document._sys.filename}`;
    },
  },
  description:
    "Some of the content on this page comes from SharePoint, if you wish to edit that content please contact the marketing team (i.e. Camilla or Seth).",
  templates: [
    {
      name: "locationPage",
      label: "Location User Group Page",
      fields: [
        tipField,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        seoSchema,
        {
          type: "string",
          label: "Register URL",
          name: "registerUrl",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "object",
          label: "Join GitHub Panel",
          name: "joinGithub",
          fields: joinGithubSchema.fields,
        },
        {
          type: "object",
          label: "When & Where Panel",
          name: "whenAndWhere",
          fields: [
            {
              type: "rich-text",
              label: "Content",
              name: "content",
            },
            {
              type: "string",
              label: "Google Maps Embed URL",
              name: "googleMapsEmbedUrl",
            },
          ],
        },
        {
          type: "object",
          label: "Agenda Panel",
          name: "agenda",
          fields: [
            {
              type: "string",
              label: "Time",
              name: "time",
            },
            {
              type: "string",
              label: "Label",
              name: "label",
            },
          ],
          ui: {
            itemProps: (item) => {
              return { label: item?.label };
            },
          },
          list: true,
        },
        {
          type: "object",
          label: "Organizer Panel",
          name: "organizer",
          fields: [
            {
              type: "string",
              label: "Name",
              name: "name",
            },
            {
              type: "string",
              label: "Position",
              name: "position",
            },
            {
              type: "string",
              label: "Name URL",
              name: "nameUrl",
            },
            {
              type: "image",
              label: "Organizer Image",
              name: "profileImg",
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              uploadDir: () => "people",
            },
            {
              type: "rich-text",
              label: "Organizer Bio",
              name: "bio",
            },
          ],
        },
        {
          type: "object",
          label: "Latest Tech",
          name: "latestTech",
          fields: latestTechSchema.fields,
        },
        {
          type: "object",
          list: true,
          name: "sections",
          label: "Sections",
          templates: sectionPageBlocks,
        },
        {
          type: "string",
          label: "About Header",
          name: "aboutHeader",
        },
        {
          type: "rich-text",
          label: "About Content",
          name: "aboutContent",
          isBody: true,
        },
        {
          type: "reference",
          label: "Priority testimonial categories",
          name: "testimonialCategories",
          collections: ["testimonialCategories"],
        },
        azureBannerSchema,
      ],
    },
    {
      name: "contentPage",
      label: "Content User Group Page",
      fields: [
        tipField,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        seoSchema,
        {
          type: "rich-text",
          name: "_body",
          label: "Body",
          isBody: true,
          templates: [...Schemas.pageBlocks],
        },
        azureBannerSchema,
      ],
    },
  ],
};

export const userGroupGlobalSchema: Collection = {
  label: "User Groups - Sections",
  name: "userGroupGlobal",
  format: "json",
  path: "content/netug/global",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    {
      type: "string",
      label: "Latest Tech Title",
      name: "latestTechTitle",
    },
    {
      type: "object",
      label: "Latest Technology Badges",
      name: "latestTechBadges",
      fields: [
        {
          type: "boolean",
          label: "Randomize",
          name: "random",
        },
        {
          type: "object",
          label: "Badges",
          name: "badgesList",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.name };
            },
          },
          fields: [
            {
              type: "string",
              label: "Name",
              name: "name",
              isTitle: true,
              required: true,
            },
            {
              type: "string",
              label: "URL",
              name: "url",
            },
            {
              type: "image",
              label: "Badge image",
              name: "imgURL",
              required: true,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              uploadDir: () => "/badges",
            },
            {
              type: "number",
              label: "Badge image rotation",
              name: "rotate",
            },
            {
              type: "number",
              label: "Animation duration",
              name: "duration",
            },
            {
              type: "boolean",
              label: "Bounce down",
              name: "bounceDown",
            },
          ],
        },
      ],
    },
    youtubePlaylistSchema,
    {
      type: "object",
      label: "Join Us Panel",
      name: "joinUs",
      fields: joinAsPresenterSchema.fields,
    },
    {
      type: "object",
      label: "Technologies",
      name: "technologies",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.name };
        },
      },
      fields: [
        {
          type: "string",
          label: "Technology Name",
          name: "name",
        },
        {
          type: "string",
          label: "Image URL",
          name: "imageUrl",
          description:
            "The path of the image from the project root (most of the time, '/images/...')",
        },
      ],
    },
  ],
};
