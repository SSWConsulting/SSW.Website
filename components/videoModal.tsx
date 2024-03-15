import classNames from "classnames";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import {
  MATCH_URL_VIMEO,
  MATCH_URL_YOUTUBE,
  getVimeoId,
  getYouTubeId,
} from "../helpers/embeds";

const YouTubeEmbed = dynamic(
  () => import("./embeds/youtubeEmbed").then((mod) => mod.YouTubeEmbed),
  {
    ssr: false,
  }
);

const VimeoEmbed = dynamic(
  () => import("./embeds/vimeoEmbed").then((mod) => mod.VimeoEmbed),
  {
    ssr: false,
  }
);

type VideoModalProps = {
  children?: React.ReactNode;
  className?: string;
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
  overflow,
  className,
}: VideoModalProps) => {
  const [videoId, setVideoId] = useState<string>();
  const [clicked, setClicked] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  const isYouTube = MATCH_URL_YOUTUBE.test(url);
  const isVimeo = MATCH_URL_VIMEO.test(url);

  useEffect(() => {
    if (isYouTube) {
      const id = getYouTubeId(url);
      setVideoId(id);
      setImageSrc(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
    } else if (isVimeo) {
      const id = getVimeoId(url);
      setVideoId(id);
      getVimeoData(id).then((res) => {
        setImageSrc(res[0].thumbnail_large);
      });
    } else {
      setVideoId("");
      setImageSrc("");
    }
  }, [url, isYouTube, isVimeo]);

  return (
    <div
      className={classNames(
        "h-full rounded",
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
                  src={imageSrc || ""}
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
