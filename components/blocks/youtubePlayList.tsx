import { BsArrowRightCircle } from "react-icons/bs";
import { Template, TinaField } from "tinacms";
import { CustomLink } from "../customLink";
import { VideoCard } from "../util/videoCards";

export const YoutubePlayListBlock = ({ props, playlistVideosLinks }) => {
  return (
    <>
      <span className="text-sswRed">
        <h2>{props?.title}</h2>
      </span>
      <div className="grid grid-cols-1 justify-center gap-8 lg:grid-cols-3">
        {playlistVideosLinks?.map((video, index) => (
          <div key={index}>
            <VideoCard {...video} theme="light" />
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <CustomLink
          href={`https://www.youtube.com/playlist?list=${props?.playlistId}`}
          className="done relative mx-2 mt-8 inline-flex overflow-hidden rounded border-none bg-sswRed pl-3 text-white"
        >
          {props?.textForPlayListLink}
          <BsArrowRightCircle className="ml-1 inline" />
        </CustomLink>
      </div>
    </>
  );
};

export const youtubePlayListBlockSchema: TinaField = {
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
    },
    {
      type: "number",
      label: "Number of vidoes",
      name: "numberOfVideos",
    },
    {
      type: "string",
      name: "textForPlayListLink",
      label: "Text for Playlist link",
    },
  ],
};

export const youtubePlayListBlockSchemaTempalte: Template = {
  name: "YoutubePlayListBlock",
  label: "Youtube PlayList Block",
  fields: [youtubePlayListBlockSchema],
};
