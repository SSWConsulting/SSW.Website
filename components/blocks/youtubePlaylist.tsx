import axios from "axios";
import { Key, useEffect, useState } from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import { Template, TinaField } from "tinacms";
import { VideoLink } from "../../services/server/youtube";
import { CustomLink } from "../customLink";
import { VideoCard } from "../util/videoCards";

export type YoutubePlaylistProps = {
  title?: string;
  playlistId: string;
  videosCount?: number;
  playlistButton?: {
    text?: string;
    link?: string;
    animated?: boolean;
  };
};

export const YoutubePlaylistBlock: React.FC<YoutubePlaylistProps> = ({
  title,
  playlistId,
  videosCount,
  playlistButton,
}) => {
  const [playlistVideosLinks, setPlaylistVideosLinks] = useState([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        await axios
          .get<VideoLink[]>("/api/get-youtube-playlist", {
            params: {
              playlistId: playlistId,
              videosCount: videosCount,
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

    if (playlistId && videosCount) {
      fetchPlaylist();
    }
  }, [playlistId, videosCount]);

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
        {playlistVideosLinks?.map((video: VideoLink, index: Key) => (
          <VideoCard {...video} theme="light" key={index} />
        ))}
      </div>
      {playlistButton?.text && (
        <div className="flex justify-center">
          <CustomLink
            href={`https://www.youtube.com/playlist?list=${
              playlistButton?.link || playlistId
            }`}
            className="done relative mx-2 mt-8 inline-flex overflow-hidden rounded border-none bg-sswRed pl-3 text-white"
            data-aos={playlistButton.animated ? "fade-up" : undefined}
          >
            {playlistButton.text}
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
          description: "DEFAULT: playlistId",
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
