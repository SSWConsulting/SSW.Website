import axios from "axios";
import { Key, useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Template, TinaField } from "tinacms";
import { PlayListType } from "../../services/server/youtube";
import { CustomLink } from "../customLink";
import { VideoCard } from "../util/videoCards";

export type YoutubePlayListProps = {
  title?: string;
  playlistId: string;
  numberOfVideos: number;
  textForPlayListLink?: string;
};

export const YoutubePlayListBlock: React.FC<YoutubePlayListProps> = ({
  title,
  playlistId,
  textForPlayListLink,
  numberOfVideos,
}) => {
  const [playlistVideosLinkss, setPlaylistVideosLinkss] = useState([]);

  const getYoutubePlaylist = async () => {
    await axios
      .get<PlayListType[]>("/api/get-youtube-playlist", {
        params: {
          playlistId: playlistId,
          videosCount: numberOfVideos,
        },
      })
      .then((response) => {
        response;
        setPlaylistVideosLinkss(response.data);
      });
  };
  useEffect(() => {
    getYoutubePlaylist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {title && (
        <span className="text-sswRed">
          <h2>{title}</h2>
        </span>
      )}
      <div className="grid h-full grid-cols-1 justify-center gap-8 lg:grid-cols-3">
        {playlistVideosLinkss?.map((video: PlayListType, index: Key) => (
          <VideoCard {...video} theme="light" key={index} />
        ))}
      </div>
      {textForPlayListLink && (
        <div className="flex justify-center">
          <CustomLink
            href={`https://www.youtube.com/playlist?list=${playlistId}`}
            className="done relative mx-2 mt-8 inline-flex overflow-hidden rounded border-none bg-sswRed pl-3 text-white"
          >
            {textForPlayListLink}
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
