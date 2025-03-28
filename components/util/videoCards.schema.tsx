export const videoCardSchema = {
  type: "object",
  label: "Videos",
  name: "videos",
  fields: [
    {
      type: "string",
      label: "Channel Link",
      name: "channelLink",
    },
    {
      type: "object",
      label: "Video Cards",
      name: "videoCards",
      list: true,
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
      ],
    },
  ],
};
