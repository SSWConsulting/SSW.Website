import { Collection } from "tinacms";
import * as Schemas from "../../components/blocks";
import { seoSchema } from "../../components/util/seo";

export const liveSchema: Collection = {
  label: "Live - Pages",
  name: "live",
  path: "content/live",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      return `/live/${document._sys.filename}`;
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
    },
    {
      type: "string",
      name: "nextEvent",
      label: "Next Event",
    },
    {
      type: "string",
      name: "pastEvents",
      label: "Past Events",
    },
    {
      type: "string",
      name: "youtubePlaylistId",
      label: "Youtube Playlist Id",
      description: "Please refresh the page to update the playlist",
    },
  ],
};
