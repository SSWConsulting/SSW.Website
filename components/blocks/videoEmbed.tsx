import classNames from "classnames";
import { VideoModal } from "../videoModal";

type VideoEmbedProps = {
  data: {
    url: string;
    roundedEdges?: boolean;
    videoWidth?: string;
    removeMargin?: boolean;
    overflow?: boolean;
    uncentre?: boolean;
    caption?: string;
    duration?: string;
  };
};

export const VideoEmbed = ({ data }: VideoEmbedProps) => {
  const width = data.videoWidth || "w-3/4";
  const margin = data.removeMargin ? "m-0" : "m-8";
  const centreBlock = data.uncentre ? "" : "mx-auto";

  return (
    <figure
      className={classNames(
        "relative max-md:w-full",
        width,
        margin,
        centreBlock
      )}
    >
      {/* The aspect ratio lives on the player (VideoModal) so the caption below
          does not stretch the ratio box. */}
      <VideoModal
        url={data.url}
        overflow={data.overflow}
        roundedEdges={data.roundedEdges}
        className="cursor-pointer"
      />
      {data.caption && (
        <figcaption
          className={classNames(
            "mt-2 font-bold text-sswBlack",
            !data.uncentre && "text-center"
          )}
        >
          Video: {data.caption} {data.duration && <>({data.duration})</>}
        </figcaption>
      )}
    </figure>
  );
};
