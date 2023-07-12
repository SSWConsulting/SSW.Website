import { getYouTubeId } from "../../helpers/embeds";

type YouTubeEmbedProps = {
  className?: string;
  width: string;
  height: string;
  url: string;
  autoplay?: boolean;
};

export const YouTubeEmbed = ({
  className,
  width,
  height,
  url,
  autoplay,
}: YouTubeEmbedProps) => {
  return (
    <iframe
      className={className}
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${getYouTubeId(url || "")}?autoplay=${
        autoplay ? 1 : 0
      }`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
