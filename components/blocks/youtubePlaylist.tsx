import axios from "axios";
import { Key, useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Template, TinaField } from "tinacms";
import { PlaylistType } from "../../services/server/youtube";
import { CustomLink } from "../customLink";
import { VideoCard } from "../util/videoCards";

export type YoutubePlaylistProps = {
  title?: string;
  playlistId: string;
  numberOfVideos: number;
  textForPlayListLink?: string;
};

export const YoutubePlaylistBlock: React.FC<YoutubePlaylistProps> = ({
  title,
  playlistId,
  textForPlayListLink,
  numberOfVideos,
}) => {
  const [playlistVideosLinks, setPlaylistVideosLinks] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        await axios
          .get<PlaylistType[]>("/api/get-youtube-playlist", {
            params: {
              playlistId: playlistId,
              videosCount: numberOfVideos,
            },
          })
          .then((response) => {
            response;
            setPlaylistVideosLinks(response.data);
          });
      } catch (error) {
        alert(error);
      }
    };

    if (playlistId && numberOfVideos) {
      fetchPlaylist();
    }
  }, [playlistId, numberOfVideos]);

  if (!playlistId) {
    return <></>;
  }
  return (
    <>
      {title && (
        <span className="text-sswRed">
          <h2>{title}</h2>
        </span>
      )}
      <div className="grid h-full grid-cols-1 justify-center gap-8 lg:grid-cols-3">
        {playlistVideosLinks?.map((video: PlaylistType, index: Key) => (
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
      label: "Number of vidoes",
      name: "numberOfVideos",
      required: true,
    },
    {
      type: "string",
      name: "textForPlaylistLink",
      label: "Text for Playlist link",
    },
  ],
};

export const youtubePlayListBlockSchema: Template = {
  name: "YoutubePlaylistBlock",
  label: "Youtube PlayList Block",
  fields: [youtubePlaylistSchema],
};
