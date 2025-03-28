type YouTubeEmbedProps = {
  className?: string;
  tinaField?: string;
  width?: string;
  height?: string;
  id: string;
  autoplay?: boolean;
  showSeparateChannelPreviews?: boolean;
  controls?: 1 | 0;
};

export const YouTubeEmbed = ({
  className,
  width,
  height,
  tinaField,
  id,
  autoplay,
  showSeparateChannelPreviews = true,
  controls = 1,
}: YouTubeEmbedProps) => {
  return (
    <iframe
      className={className}
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${id || ""}?autoplay=${
        autoplay ? 1 : 0
      }&controls=${controls}&rel=${Number(showSeparateChannelPreviews)}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      data-tina-field={tinaField}
    />
  );
};
