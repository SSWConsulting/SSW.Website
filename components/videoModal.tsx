"use client";

import classNames from "classnames";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

import { FaPlayCircle } from "react-icons/fa";
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
  return video;
};

type VideoState = {
  videoType: VideoType | undefined;
  videoId: string | undefined;

  test?: string;
  imageSrc: string;
  isVimeo?: boolean;
  isYoutube?: boolean;
};

export const VideoModal = ({
  children = null,
  url,
  frameClassName,
  overflow,
  roundedEdges,
  className,
}: VideoModalProps) => {
  const [videoState, setVideoState] = useState<VideoState>({
    videoType: undefined,
    videoId: undefined,
    imageSrc: "",
  });
  const [clicked, setClicked] = useState<boolean>(false);
  const setVideoThumbnail = useCallback(({ isYouTube, isVimeo, videoId }) => {
    if (isYouTube) {
      setVideoState({
        videoId,
        videoType: "youtube",
        imageSrc: `https://img.youtube.com/vi/${videoId}/maxresdefault.jp`,
      });
      return;
    }
    if (isVimeo)
      getVimeoData(videoId).then((res) => {
        setVideoState({
          videoId,
          videoType: "vimeo",
          imageSrc: res[0].thumbnail_large,
        });
      });
  }, []);

  const extractVideoId = useCallback((url: string) => {
    let videoId;
    const isYouTube = MATCH_URL_YOUTUBE.test(url);
    const isVimeo = MATCH_URL_VIMEO.test(url);
    if (isYouTube) {
      videoId = getYouTubeId(url);
    } else if (isVimeo) {
      videoId = getVimeoId(url);
    }

    return { isYouTube, isVimeo, videoId };
  }, []);

  useEffect(() => {
    const { isVimeo, isYouTube, videoId } = extractVideoId(url);
    setVideoThumbnail({ isVimeo, isYouTube, videoId });
  }, [setVideoThumbnail, extractVideoId, url]);

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
            {videoState.imageSrc && (
              <>
                <Image
                  className={classNames("!my-0", frameClassName)}
                  src={videoState.imageSrc}
                  fill
                  alt="Video player"
                  onError={() => {
                    setVideoState({
                      ...videoState,
                      imageSrc:
                        videoState.videoType === "youtube"
                          ? `https://img.youtube.com/vi/${videoState.videoId}/mqdefault.jpg`
                          : "",
                    });
                  }}
                />
                <PlayArrow />{" "}
              </>
            )}
          </div>
        ) : (
          <>
            {videoState.videoType === "youtube" && (
              <>
                <YouTubeEmbed
                  className={classNames(
                    "absolute left-0 top-0",
                    frameClassName
                  )}
                  id={videoState.videoId}
                  width={"100%"}
                  height={"100%"}
                  autoplay={true}
                />
              </>
            )}
            {videoState.videoType === "vimeo" && (
              <>
                <VimeoEmbed
                  className={classNames(
                    "absolute left-0 top-0",
                    frameClassName
                  )}
                  id={videoState.videoId}
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
