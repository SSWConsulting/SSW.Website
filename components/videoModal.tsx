"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

import { FaPlayCircle } from "react-icons/fa";
import {
  MATCH_URL_VIMEO,
  MATCH_URL_YOUTUBE,
  getVimeoId,
  getYouTubeId,
} from "../helpers/embeds";

import Image from "next/image";

const YouTubeEmbed = dynamic(
  () => import("./embeds/youtubeEmbed").then((mod) => mod.YouTubeEmbed),
  { ssr: false }
);
const VimeoEmbed = dynamic(
  () => import("./embeds/vimeoEmbed").then((mod) => mod.VimeoEmbed),
  { ssr: false }
);

type VideoModalProps = {
  frameClassName?: string;
  children?: React.ReactNode;
  className?: string;
  roundedEdges?: boolean;
  url?: string;
  overflow?: boolean;
};

type VideoType = "youtube" | "vimeo";

const getVimeoData = async (id: string) => {
  const videoData = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
  const video = await videoData.json();
  return video[0]?.thumbnail_large || "";
};

const extractVideoId = (url?: string) => {
  const isYouTube = !!url && MATCH_URL_YOUTUBE.test(url);
  const isVimeo = !!url && MATCH_URL_VIMEO.test(url);
  let videoId: string | undefined;
  if (isYouTube) {
    videoId = getYouTubeId(url);
  } else if (isVimeo) {
    videoId = getVimeoId(url);
  }

  return { isYouTube, isVimeo, videoId };
};

export const VideoModal = ({
  children = null,
  url,
  frameClassName,
  overflow,
  roundedEdges,
  className,
}: VideoModalProps) => {
  const [clicked, setClicked] = useState<boolean>(false);

  // YouTube IDs resolve synchronously, so the thumbnail is derived during render —
  // this puts the <Image priority> in the server HTML, letting its LCP preload fire
  // immediately. Vimeo needs an async fetch, so it resolves later via the effect.
  const { isYouTube, isVimeo, videoId } = useMemo(
    () => extractVideoId(url),
    [url]
  );
  const videoType: VideoType | undefined = isYouTube
    ? "youtube"
    : isVimeo
      ? "vimeo"
      : undefined;

  const [vimeoSrc, setVimeoSrc] = useState("");
  const [youTubeFailed, setYouTubeFailed] = useState(false);

  useEffect(() => {
    if (!isVimeo || !videoId) return;
    let active = true;
    getVimeoData(videoId).then((src) => {
      if (active) setVimeoSrc(src);
    });
    return () => {
      active = false;
    };
  }, [isVimeo, videoId]);

  const imageSrc = isYouTube
    ? `https://img.youtube.com/vi/${videoId}/${
        youTubeFailed ? "mqdefault" : "maxresdefault"
      }.jpg`
    : vimeoSrc;

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
                  className={classNames("!my-0", frameClassName)}
                  src={imageSrc}
                  fill
                  priority
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt="Video player"
                  onError={() => setYouTubeFailed(true)}
                />
                <PlayArrow />
              </>
            )}
          </div>
        ) : (
          <>
            {videoType === "youtube" && (
              <>
                <YouTubeEmbed
                  className={classNames(
                    "absolute left-0 top-0",
                    frameClassName
                  )}
                  id={videoId}
                  width={"100%"}
                  height={"100%"}
                  autoplay={true}
                />
              </>
            )}
            {videoType === "vimeo" && (
              <>
                <VimeoEmbed
                  className={classNames(
                    "absolute left-0 top-0",
                    frameClassName
                  )}
                  id={videoId}
                  autoplay={true}
                />
              </>
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
