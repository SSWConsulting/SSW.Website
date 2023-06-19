import React from "react";
import type { Template } from "tinacms";
import { VideoModal } from "../videoModal";
import classNames from "classnames";

export const VideoEmbed = ({ data }) => {
	const width = data.videoWidth || "w-3/4";
	const margin = data.removeMargin ? "" : "m-8" ;

  return (
    <div className={classNames("relative mx-auto aspect-video", width, margin)}>
      <VideoModal
        url={data.url}
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
		{
			type: "string",
			label: "Width",
			description: "Default is 75%",
			name: "videoWidth",
			required: false,
			options: [
				{
					value: "w-full",
					label: "100%"
				},
				{
					value: "w-3/4",
					label: "75%"
				},
				{
					value: "w-1/2",
					label: "50%"
				},
				{
					value: "w-1/4",
					label: "25%"
				},
			]
		},
		{
			type: "boolean",
			label: "Remove margin",
			name: "removeMargin",
			required: false,
		}
	],
};
