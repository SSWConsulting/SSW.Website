import Script from "next/script";

const gtmId = process.env.NEXT_PUBLIC_GOOGLE_GTM_ID;

export const Analytics = () => {
  return (
    // TODO - uncomment this when we're ready to use Partytown
    // <Head>
    //   <Partytown
    //     debug={false}
    //     logScriptExecution
    //     logSendBeaconRequests
    //     forward={[
    //       "gtag",
    //       "dataLayer.push",
    //       "_hsq.push, fbq, __tag_assistant_forwarder",
    //       "hj",
    //       "hjBootstrap",
    //       "hjBootstrapCalled",
    //       "hjLazyModules",
    //       "hjSiteSettings",
    //       "_hjSettings",
    //       "clarity",
    //     ]}
    //     resolveUrl={(url, location, type) => {
    //       const proxiedWhitelist = [
    //         "connect.facebook.net",
    //         "snap.licdn.com",
    //         "cdn3l.ink",
    //         "googleads.g.doubleclick.net",
    //         "js.hs-analytics.net",
    //         "www.google.com",
    //       ];

    //       if (
    //         (type === "script" &&
    //           !url.pathname.includes("gtm.js") &&
    //           proxiedWhitelist.includes(url.hostname)) ||
    //         url.href.includes("https://www.google-analytics.com/analytics.js")
    //       ) {
    //         const proxiedUrl = new URL(
    //           "https://cdn.builder.io/api/v1/proxy-api"
    //         );
    //         proxiedUrl.searchParams.append("url", url.href);
    //         return proxiedUrl;
    //       }
    //       return url;
    //     }}
    //   />

    // </Head>
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `}
    </Script>
  );
};
