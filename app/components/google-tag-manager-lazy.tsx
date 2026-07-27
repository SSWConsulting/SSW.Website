"use client";

import Script from "next/script";

// GTM injects every marketing/analytics tag on the site (GA4, Google Ads,
// Facebook, Hotjar, LinkedIn, Bing, Clarity, Plausible). @next/third-parties'
// <GoogleTagManager> hardcodes strategy="afterInteractive", loading all of that
// during hydration and contending with first paint. lazyOnload defers the whole
// stack to browser idle after the load event. sendGTMEvent still queues into
// dataLayer before GTM boots, so no events are lost.
export function GoogleTagManagerLazy({ gtmId }: { gtmId?: string }) {
  if (!gtmId) return null;
  return (
    <Script id="gtm-lazy" strategy="lazyOnload">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
    </Script>
  );
}
