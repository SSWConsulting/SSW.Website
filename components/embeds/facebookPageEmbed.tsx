import Script from "next/script";

type FacebookPageEmbedProps = {
  className?: string;
  username: string;
  height?: number;
};

export const FacebookPageEmbed = ({
  className,
  username,
  height,
}: FacebookPageEmbedProps) => {
  const pageUrl = `https://www.facebook.com/${username}`;

  /* eslint-disable tailwindcss/no-custom-classname */
  return (
    <>
      <div id="fb-root"></div>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v18.0&appId=459581137947359&autoLogAppEvents=1"
        nonce="DysWxggy"
        strategy="lazyOnload"
      />
      <div className={className}>
        <div
          data-lazy="true"
          className={"fb-page mx-auto"}
          data-href={pageUrl}
          data-tabs="timeline"
          data-width="500"
          data-height={height?.toString() ?? 600}
          data-small-header="false"
          data-adapt-container-width="true"
          data-hide-cover="false"
          data-show-facepile="true"
        >
          <blockquote cite={pageUrl} className="fb-xfbml-parse-ignore">
            <a href={pageUrl}>SSW</a>
          </blockquote>
        </div>
      </div>
    </>
  );
};
