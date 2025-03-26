"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";

import {
  MATCH_URL_VIMEO,
  MATCH_URL_YOUTUBE,
  getVimeoId,
  getYouTubeId,
} from "../helpers/embeds";

const Image = dynamic(() => import("next/image"), { ssr: false });
const YouTubeEmbed = dynamic(
  () => import("./embeds/youtubeEmbed").then((mod) => mod.YouTubeEmbed),
  { ssr: false }
);
const VimeoEmbed = dynamic(
  () => import("./embeds/vimeoEmbed").then((mod) => mod.VimeoEmbed),
  { ssr: false }
);

type VideoModalProps = {
  children?: React.ReactNode;
  className?: string;
  roundedEdges?: boolean;
  url: string;
  overflow?: boolean;
};

const getVimeoData = async (id: string) => {
  try {
    const videoData = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
    const video = await videoData.json();
    return video[0]?.thumbnail_large || "";
  } catch (error) {
    return "";
  }
};

export const VideoModal = ({
  children = null,
  url,
  overflow,
  roundedEdges,
  className,
}: VideoModalProps) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const youtubeMatch = MATCH_URL_YOUTUBE.test(url);
    const vimeoMatch = MATCH_URL_VIMEO.test(url);

    if (youtubeMatch) {
      const id = getYouTubeId(url);
      if (id && id !== videoId) {
        setVideoId(id);
        setImageSrc(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
      }
    } else if (vimeoMatch) {
      const id = getVimeoId(url);
      if (id && id !== videoId) {
        setVideoId(id);
        getVimeoData(id).then((thumbnail) => {
          if (thumbnail && thumbnail !== imageSrc) {
            setImageSrc(thumbnail);
          }
        });
      }
    } else {
      setVideoId(null);
      setImageSrc(null);
    }
  }, [url]);

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
                  onError={() => {
                    if (imageSrc.includes("maxresdefault")) {
                      setImageSrc(
                        `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
                      );
                    }
                  }}
                />
                <PlayArrow />
              </>
            )}
          </div>
        ) : (
          <>
            {videoId && MATCH_URL_YOUTUBE.test(url) && (
              <YouTubeEmbed
                className="absolute left-0 top-0"
                id={videoId}
                width={"100%"}
                height={"100%"}
                autoplay={true}
              />
            )}
            {videoId && MATCH_URL_VIMEO.test(url) && (
              <VimeoEmbed
                className="absolute left-0 top-0"
                id={videoId}
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
