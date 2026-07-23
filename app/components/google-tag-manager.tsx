import Script from "next/script";

/**
 * GTM split out of @next/third-parties' <GoogleTagManager>, which only exposes an
 * afterInteractive load. The dataLayer is created and `gtm.start` pushed eagerly, so early
 * `sendGTMEvent` / `dataLayer.push` calls (e.g. the eventbrite_order_complete conversion) queue
 * and flush once GTM arrives — but gtm.js itself loads on idle (lazyOnload) instead of during
 * hydration, keeping the container's marketing tags (GA4/Ads/FB/Hotjar) out of the critical window.
 * sendGTMEvent from @next/third-parties keeps working: it pushes to window.dataLayer directly and
 * doesn't depend on this component rendering.
 * Retiming the individual tag triggers is GTM container config, not code — see #4908.
 */
export const GoogleTagManager = ({ gtmId }: { gtmId?: string }) => {
  if (!gtmId) return null;
  return (
    <>
      <Script
        id="gtm-datalayer-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html:
            "window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});",
        }}
      />
      <Script
        id="gtm-script"
        data-ntpc="GTM"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`}
      />
    </>
  );
};
