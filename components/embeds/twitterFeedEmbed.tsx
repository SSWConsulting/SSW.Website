import classNames from "classnames";
import Script from "next/script";
import { CustomLink } from "../customLink";

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
      <CustomLink
        href={`https://twitter.com/${username}?ref_src=twsrc%5Etfw`}
        className={classNames("twitter-timeline col-span-1", className)}
        data-height={height?.toString() ?? 600}
      >
        Tweets by SSW_TV
      </CustomLink>
      <Script
        async
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
    </>
  );
};
