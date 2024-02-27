import classNames from "classnames";
import type { Template } from "tinacms";
import { VideoModal } from "../videoModal";

type VideoEmbedProps = {
  data: {
    url: string;
    videoWidth?: string;
    removeMargin?: boolean;
    overflow?: boolean;
    uncentre?: boolean;
    caption?: string;
  };
};

export const VideoEmbed = ({ data }: VideoEmbedProps) => {
  const width = data.videoWidth || "w-3/4";
  const margin = data.removeMargin ? "" : "m-8";
  const uncentre = data.uncentre ? "" : "mx-auto";

  return (
    <div
      className={classNames(
        "relative aspect-video cursor-pointer",
        width,
        margin,
        uncentre
      )}
    >
      <VideoModal url={data.url} overflow={data.overflow} />
      {data.caption && <p className="text-center">{data.caption}</p>}
      <div></div>
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
      description:
        "Only YouTube and Vimeo URLs are supported. To embed videos from other sources, please raise an issue",
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
          label: "100%",
        },
        {
          value: "w-3/4",
          label: "75%",
        },
        {
          value: "w-1/2",
          label: "50%",
        },
        {
          value: "w-1/4",
          label: "25%",
        },
      ],
    },
    {
      type: "boolean",
      label: "Remove margin",
      name: "removeMargin",
      required: false,
    },
    {
      type: "boolean",
      label: "Remove centre alignment",
      name: "uncentre",
    },
    {
      type: "boolean",
      label: "Overflow - read more at tailwindcss.com/docs/overflow",
      name: "overflow",
      required: false,
    },
    {
      type: "string",
      label: "Caption",
      name: "caption",
      required: false,
    },
  ],
};
