"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { FaPlayCircle } from "react-icons/fa";

import axios from "axios";
import {
  MATCH_URL_VIMEO,
  MATCH_URL_YOUTUBE,
  getVimeoId,
  getYouTubeId,
} from "../helpers/embeds";

const Image = dynamic(() => import("next/image"));

const YouTubeEmbed = dynamic(() =>
  import("./embeds/youtubeEmbed").then((mod) => mod.YouTubeEmbed)
);

const VimeoEmbed = dynamic(() =>
  import("./embeds/vimeoEmbed").then((mod) => mod.VimeoEmbed)
);

type VideoModalProps = {
  children?: React.ReactNode;
  className?: string;
  roundedEdges?: boolean;
  youtubeVideoId?: string;
  url: string;
  overflow?: boolean;
};

const getVimeoData = async (id: string) => {
  const videoData = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
  const video = await videoData.json();
  return video;
};

export const VideoModal = ({
  children = null,
  url,
  youtubeVideoId,
  overflow,
  roundedEdges,
  className,
}: VideoModalProps) => {
  const [videoId, setVideoId] = useState<string>(youtubeVideoId || undefined);
  const [clicked, setClicked] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const isYouTube = MATCH_URL_YOUTUBE.test(url);
  const isVimeo = MATCH_URL_VIMEO.test(url);

  const setVideoThumbnail = useCallback(() => {
    if (isYouTube) {
      axios
        .get(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
        .then(() => {
          setImageSrc(
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
          );
        })
        .catch(() => {
          setImageSrc(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`);
        });
      return;
    }
    if (isVimeo)
      getVimeoData(videoId).then((res) => {
        setImageSrc(res[0].thumbnail_large);
      });
  }, [videoId, isYouTube, isVimeo]);

  const extractVideoId = useCallback(() => {
    if (youtubeVideoId) {
      return;
    }
    if (isYouTube) {
      console.log("extracting youtube id");
      const id = getYouTubeId(url);
      setVideoId(id);
    } else if (isVimeo) {
      const id = getVimeoId(url);
      setVideoId(id);
      getVimeoData(id).then((res) => {
        setImageSrc(res[0].thumbnail_large);
      });
    }
  }, [url, isVimeo, isYouTube, youtubeVideoId]);

  useEffect(() => {
    extractVideoId();
    setVideoThumbnail();
  }, [setVideoThumbnail, extractVideoId]);

  return (
    <div
      className={classNames(
        "h-full",
        roundedEdges !== false ? "rounded" : "rounded-none",
        overflow ? "clear-both" : "overflow-hidden",
        className
      )}
    >
      <div className="relative mx-auto aspect-video w-full cursor-pointer">
        {!clicked ? (
          <div className="size-full" onClick={() => setClicked(true)}>
            {imageSrc && (
              <>
                <Image
                  className="!my-0"
                  src={imageSrc}
                  fill
                  alt="Video player"
                />
                <PlayArrow />{" "}
              </>
            )}
          </div>
        ) : (
          <>
            {isYouTube && (
              <YouTubeEmbed
                className="absolute left-0 top-0"
                id={videoId || ""}
                width={"100%"}
                height={"100%"}
                autoplay={true}
              />
            )}
            {isVimeo && (
              <VimeoEmbed
                className="absolute left-0 top-0"
                id={videoId || ""}
                autoplay={true}
              />
            )}
          </>
        )}
      </div>
      {children}
    </div>
  );
};

const PlayArrow = () => {
  return (
    <FaPlayCircle
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-sswRed"
      size={70}
    />
  );
};
