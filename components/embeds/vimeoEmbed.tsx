import classNames from "classnames";
import Script from "next/script";

export type VimeoEmbedProps = {
  className?: string;
  id: string;
  autoplay?: boolean;
};

export const VimeoEmbed = ({ className, id, autoplay }: VimeoEmbedProps) => {
  return (
    <>
      <iframe
        className={classNames(className, "h-full w-full")}
        src={`https://player.vimeo.com/video/${id}?h=62ccd0699b&autoplay=${
          autoplay ? 1 : 0
        }&title=0&byline=0&portrait=0`}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
      <Script
        src="https://player.vimeo.com/api/player.js"
        strategy="lazyOnload"
      />
    </>
  );
};
