import { Partytown } from "@builder.io/partytown/react";
import Head from "next/head";

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_GTM_ID;

export const Analytics = () => {
  return (
    <Head>
      <Partytown
        debug={true}
        forward={["gtag", "dataLayer.push", "_hsq.push, fbq"]}
        resolveUrl={(url, location, type) => {
          console.log("whack", url, location);

          const proxiedWhitelist = [
            "connect.facebook.net",
            "snap.licdn.com",
            "cdn3l.ink",
            "googleads.g.doubleclick.net",
            "js.hs-analytics.net",
            "www.google.com",
          ];

          if (
            type === "script" &&
            !url.pathname.includes("gtm.js") &&
            proxiedWhitelist.includes(url.hostname)
          ) {
            const proxiedUrl = new URL("http://localhost:3000/api/proxy");
            proxiedUrl.searchParams.append("url", url.href);
            return proxiedUrl;
          }
          return url;
        }}
      />
      <script id="google-tag-manager" type="text/partytown">
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}
      </script>
    </Head>
  );
};
