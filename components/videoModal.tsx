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

type VideoType = "youtube" | "vimeo";

const getVimeoData = async (id: string) => {
  const videoData = await fetch(`https://vimeo.com/api/v2/video/${id}.json`);
  const video = await videoData.json();
  return video;
};

type VideoState = {
  videoType: VideoType | undefined;
  videoId: string | undefined;
  imageSrc: string;
  isVimeo?: boolean;

  isYoutube?: boolean;
};

export const VideoModal = ({
  children = null,
  url,
  youtubeVideoId,
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
  // const [imageSrc, setImageSrc] = useState<string>("");

  const setVideoThumbnail = useCallback(({ isYouTube, isVimeo, videoId }) => {
    if (isYouTube) {
      setVideoState({
        videoId,
        videoType: "youtube",
        imageSrc: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      });
      return;
    }
    if (isVimeo)
      getVimeoData(videoId).then((res) => {
        setVideoState({
          videoId,
          videoType: "youtube",
          imageSrc: res[0].thumbnail_large,
        });
      });
  }, []);

  const extractVideoId = useCallback((url: string) => {
    const isYouTube = MATCH_URL_YOUTUBE.test(url);
    const isVimeo = MATCH_URL_VIMEO.test(url);
    let videoId;

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
                  className="!my-0"
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
              <YouTubeEmbed
                className="absolute left-0 top-0"
                id={videoState.videoId}
                width={"100%"}
                height={"100%"}
                autoplay={true}
              />
            )}
            {videoState.videoType === "vimeo" && (
              <VimeoEmbed
                className="absolute left-0 top-0"
                id={videoState.videoId}
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
