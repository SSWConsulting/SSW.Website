import { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

export const liveSchema: Collection = {
  label: "Live - Pages",
  name: "live",
  path: "content/live",
  format: "mdx",
  ui: {
    router: ({}) => {
      return "/live";
    },
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    // @ts-ignore
    seoSchema,
    {
      type: "rich-text",
      isBody: true,
      name: "title",
      label: "Title",
      templates: [...Schemas.pageBlocks],
      description: "Tip: Bold text is turned into Red color",
    },
    {
      type: "string",
      name: "nextEvent",
      label: "Next Event",
    },
    {
      label: "SSW TV Button",
      name: "sswTvButton",
      type: "object",
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "Channel Id",
          name: "channelId",
          type: "string",
        },
      ],
    },
    {
      type: "string",
      name: "pastEvents",
      label: "Past Events",
    },
    {
      label: "Youtube Playlist Button",
      name: "youtubePlaylistButton",
      type: "object",
      fields: [
        {
          label: "Name",
          name: "name",
          type: "string",
        },
        {
          label: "Playlist Id",
          name: "playlistId",
          type: "string",
        },
      ],
    },
  ],
};
