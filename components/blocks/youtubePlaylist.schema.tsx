import { Template, TinaField } from "tinacms";

export const youtubePlaylistSchema: TinaField = {
  type: "object",
  label: "Youtube Playlist",
  name: "youtubePlaylist",
  ui: {
    itemProps: (item) => {
      return { label: item?.title };
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Playlist Id",
      name: "playlistId",
      required: true,
    },
    {
      type: "number",
      label: "Videos Count",
      name: "videosCount",
      required: true,
    },
    {
      type: "object",
      label: "Playlist Button",
      name: "playlistButton",
      fields: [
        {
          type: "string",
          name: "text",
          label: "Text",
        },
        {
          type: "string",
          name: "link",
          label: "Link",
          description: "DEFAULT: PlaylistId.",
        },
        {
          type: "boolean",
          name: "animated",
          label: "Animated?",
        },
      ],
    },
  ],
};

export const youtubePlayListBlockSchema: Template = {
  name: "YoutubePlaylistBlock",
  label: "Youtube PlayList Block",
  fields: [youtubePlaylistSchema],
};
