import React from "react";
import ReactPlayer from "../reactPlayer/reactPlayer";
import type { Template } from "tinacms";

export const VideoEmbed = ({ data }) => {
  return (
    <div className="relative m-8 mx-auto aspect-video w-3/4">
      <ReactPlayer
        className="absolute top-0 left-0"
        url={data.url}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export const videoEmbedBlockSchema: Template = {
  name: "VideoEmbed",
  label: "Video Embed",
  ui: {
    previewSrc: "/blocks/videoEmbedContent.png",
  },
  fields: [
    {
      type: "string",
      label: "Video URL",
      name: "url",
      required: true,
    },
  ],
};
