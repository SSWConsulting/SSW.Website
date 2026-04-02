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
  const margin = data.removeMargin ? "" : "m-8";
  const uncentre = data.uncentre ? "" : "mx-auto";

  return (
    <div
      className={classNames(
        "relative aspect-video max-md:w-full",
        width,
        margin,
        uncentre
      )}
    >
      <VideoModal
        url={data.url}
        overflow={data.overflow}
        roundedEdges={data.roundedEdges}
        className="cursor-pointer"
      />
      {data.caption && (
        <p className={classNames("font-bold", !uncentre && "text-centre")}>
          Video: {data.caption} {data.duration && <>({data.duration})</>}
        </p>
      )}
    </div>
  );
};
