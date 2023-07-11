import { getYouTubeId } from "../../helpers/embeds";

type YouTubeEmbedProps = {
  className?: string;
  width: string;
  height: string;
  url: string;
};

export const YouTubeEmbed = ({
  className,
  width,
  height,
  url,
}: YouTubeEmbedProps) => {
  return (
    <iframe
      className={className}
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${getYouTubeId(url)}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
