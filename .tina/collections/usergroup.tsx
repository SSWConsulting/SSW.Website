import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";
import { pageBlocks } from "../../components/usergroup/sections/index";

import type { Collection } from "tinacms";

export const userGroupPageSchema: Collection = {
  label: "User Group Pages",
  name: "userGroupPage",
  format: "mdx",
  path: "content/netug",
  ui: {
    router: ({ document }) => {
      return `/netug/${document._sys.filename}`;
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      label: "About Content",
      name: "aboutContent",
      isBody: true,
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
      type: "object",
      list: true,
      name: "sections",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: pageBlocks,
    },
    {
      type: "string",
      label: "City (used for SharePoint matching)",
      name: "city",
      required: true,
    },
  ],
};
