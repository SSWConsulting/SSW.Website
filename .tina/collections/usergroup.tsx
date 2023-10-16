import * as Schemas from "../../components/blocks";
import { pageBlocks as sectionPageBlocks } from "../../components/usergroup/sections";
import { seoSchema } from "../../components/util/seo";

import type { Collection } from "tinacms";

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
        // @ts-ignore
        seoSchema,
        {
          type: "string",
          label: "Register URL",
          name: "registerUrl",
        },
        {
          type: "object",
          label: "Join GitHub Panel",
          name: "joinGithub",
          fields: Schemas.joinGithubSchema.fields,
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
              label: "time",
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
          fields: Schemas.latestTechSchema.fields,
        },
        {
          type: "object",
          label: "Join Us Panel",
          name: "joinUs",
          fields: Schemas.joinAsPresenterSchema.fields,
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
      ],
    },
    {
      name: "contentPage",
      label: "Content User Group Page",
      fields: [
        // @ts-ignore
        seoSchema,
        {
          type: "rich-text",
          name: "_body",
          label: "Body",
          isBody: true,
        },
      ],
    },
  ],
};

export const userGroupGlobalSchema: Collection = {
  label: "User Group Global Setttings",
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
      type: "object",
      list: true,
      name: "sections",
      label: "Sections",
      templates: sectionPageBlocks,
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
