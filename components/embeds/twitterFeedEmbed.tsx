import Script from "next/script";
import classNames from "classnames";

type TwitterFeedEmbedProps = {
  className?: string;
  username: string;
  height?: number;
};

export const TwitterFeedEmbed = ({
  className,
  username,
  height,
}: TwitterFeedEmbedProps) => {
  return (
    <>
      <a
        href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`}
        className={classNames("twitter-timeline col-span-1", className)}
        data-height={height?.toString() ?? 600}
      >
        Tweets by SSW_TV
      </a>
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </>
  );
};
