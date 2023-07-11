import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
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
  const [imageSrc, setImageSrc] = useState<string>(
    `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  );

  return (
    <div>
      <div className="overflow-hidden rounded">
        <div className="relative mx-auto aspect-video h-full w-full">
          {!clicked ? (
            <div className="h-full w-full " onClick={() => setClicked(true)}>
              <Image
                src={imageSrc}
                fill
                alt="YouTube video player"
                onError={() => {
                  if (imageSrc.includes("maxresdefault")) {
                    setImageSrc(
                      `https://img.youtube.com/vi/${id}/mqdefault.jpg`
                    );
                  }
                }}
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
    <FaPlayCircle
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-sswRed"
      size={70}
    />
  );
};
