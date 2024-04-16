import { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { youtubePlaylistSchema } from "../../components/blocks/youtubePlaylist";
import { seoSchema } from "../../components/util/seo";

export const liveSchema: Collection = {
  label: "Live - Pages",
  name: "live",
  path: "content/live",
  format: "mdx",
  ui: {
    router: () => {
      return "/live";
    },
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "string",
      name: "title",
      label: "Title",
    },
    {
      type: "rich-text",
      isBody: true,
      name: "subtitle",
      label: "Subtitle",
      templates: [...Schemas.pageBlocks],
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
    youtubePlaylistSchema,
  ],
};
