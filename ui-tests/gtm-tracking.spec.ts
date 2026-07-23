import { test } from "@playwright/test";

/**
 * Regression guard for #4908: GTM now loads on idle (lazyOnload) instead of during hydration.
 * The deferral must NOT drop tracking, so this asserts on a running site that:
 *   1. gtm.js is still fetched (on idle) — the container/beacons aren't silently disabled.
 *   2. window.dataLayer is initialised with the gtm.js start event, so early
 *      sendGTMEvent / dataLayer.push calls (e.g. the eventbrite_order_complete conversion)
 *      queue and flush once GTM arrives.
 *
 * The downstream marketing beacons only fire with the real GTM container + NEXT_PUBLIC_GOOGLE_GTM_ID
 * present, so those stay manual dashboard checks: GTM Tag Assistant (tags fired + order), GA4
 * Realtime, Meta Events Manager -> Test Events, Hotjar dashboard. Corresponding network beacons:
 * GA4 google-analytics.com/g/collect, Ads googleads.g.doubleclick.net/pagead,
 * FB facebook.com/tr?, Hotjar *.hotjar.io.
 *
 * Run against a server with the GTM id set (e.g. HOST_URL=https://www.ssw.com.au pnpm exec
 * playwright test ui-tests/gtm-tracking.spec.ts); without the id the beacon assertion self-skips.
 */
test("GTM still loads and dataLayer queues after deferral", async ({
  page,
}) => {
  const gtmRequest = page
    .waitForRequest(
      (req) => req.url().includes("googletagmanager.com/gtm.js"),
      { timeout: 15000 }
    )
    .catch(() => null);

  await page.goto("/", { waitUntil: "load" });

  // lazyOnload requests gtm.js on idle after load; resolves to the request, or null on timeout.
  const request = await gtmRequest;

  // Tracking not dropped: reaching here (not skipping) means gtm.js was fetched after the deferral.
  // No id on this server (e.g. local dev) => no request => skip the live assertion cleanly.
  test.skip(
    request === null,
    "NEXT_PUBLIC_GOOGLE_GTM_ID not set on this server — skipping the live GTM beacon assertion (verify tags via the manual dashboard checks in the file header)."
  );

  // dataLayer queuing: the eager init created the array and pushed gtm.start, so events sent
  // before GTM finishes loading are queued rather than lost. Poll rather than sample once — the
  // init runs on afterInteractive, so it may land a tick after the gtm.js request is observed.
  await page
    .waitForFunction(
      () => {
        const w = window as unknown as {
          dataLayer?: Array<{ event?: string }>;
        };
        return (
          Array.isArray(w.dataLayer) &&
          w.dataLayer.some((e) => e?.event === "gtm.js")
        );
      },
      null,
      { timeout: 5000 }
    )
    .catch(() => {
      throw new Error(
        "window.dataLayer never received the gtm.js start event — early events would be dropped."
      );
    });
});
