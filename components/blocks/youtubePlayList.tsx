import { Key } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Template, TinaField } from "tinacms";
import { CustomLink } from "../customLink";
import { VideoCard } from "../util/videoCards";

export type VideoProps = {
  title: string;
  link: string;
};

export type YoutubePlayListProps = {
  title?: string;
  playlistId: string;
  numberOfVideos: number;
  textForPlayListLink?: string;
};

export type YoutubePlayListBlockProps = {
  playlistVideosLinks: VideoProps[];
  props: YoutubePlayListProps;
};
export const YoutubePlayListBlock: React.FC<YoutubePlayListBlockProps> = ({
  props,
  playlistVideosLinks,
}) => {
  return (
    <>
      {props?.title && (
        <span className="text-sswRed">
          <h2>{props?.title}</h2>
        </span>
      )}
      <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
        {playlistVideosLinks?.map((video: VideoProps, index: Key) => (
          <div key={index}>
            <VideoCard {...video} theme="light" />
          </div>
        ))}
      </div>
      {props?.textForPlayListLink && (
        <div className="flex justify-center">
          <CustomLink
            href={`https://www.youtube.com/playlist?list=${props?.playlistId}`}
            className="done relative mx-2 mt-8 inline-flex overflow-hidden rounded border-none bg-sswRed pl-3 text-white"
          >
            {props?.textForPlayListLink}
            <BsArrowRightCircle className="ml-1 inline" />
          </CustomLink>
        </div>
      )}
    </>
  );
};

export const youtubePlayListSchema: TinaField = {
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
      label: "Number of vidoes",
      name: "numberOfVideos",
      required: true,
    },
    {
      type: "string",
      name: "textForPlayListLink",
      label: "Text for Playlist link",
    },
  ],
};

export const youtubePlayListBlockSchema: Template = {
  name: "YoutubePlayListBlock",
  label: "Youtube PlayList Block",
  fields: [youtubePlayListSchema],
};
