import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { getYouTubeId } from "../helpers/embeds";

const YouTubeEmbed = dynamic(
  () => import("./embeds/youtubeEmbed").then((mod) => mod.YouTubeEmbed),
  {
    ssr: false,
  }
);

export const VideoModal = ({ children = null, url }) => {
  const id = url ? getYouTubeId(url) : null;

  const [clicked, setClicked] = useState<boolean>(false);

  return (
    <div>
      <div className="overflow-hidden rounded">
        <div className="relative mx-auto aspect-video h-full w-full">
          {!clicked ? (
            <div>
              <Image
                src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
                fill
                alt="YouTube video player"
                onClick={() => setClicked(true)}
              />
              <PlayArrow />
            </div>
          ) : (
            <YouTubeEmbed
              className="absolute left-0 top-0"
              url={url || ""}
              width={"100%"}
              height={"100%"}
            />
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

const PlayArrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="white"
      width="72px"
      height="72px"
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
};
