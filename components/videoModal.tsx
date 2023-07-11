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
            <Image
              src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
              fill
              alt="YouTube video player"
              onClick={() => setClicked(true)}
            />
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
