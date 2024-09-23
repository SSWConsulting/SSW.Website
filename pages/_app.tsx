import "aos/dist/aos.css";
import "../styles.css";

import AOS from "aos";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DefaultSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { GoogleTagManager } from "@next/third-parties/google";
import { AppInsightsProvider } from "../context/app-insight-client";
import * as gtag from "../lib/gtag";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";

// Hack as per https://stackoverflow.com/a/66575373 to stop font awesome icons breaking
import "@fortawesome/fontawesome-svg-core/styles.css";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

const FIVE_MINS = 1000 * 60 * 5;

const ChatBaseBot = dynamic(
  () => import("../components/zendeskButton/chatBaseBot"),
  {
    ssr: false,
  }
);

const ReactQueryDevtools = dynamic(() =>
  import("@tanstack/react-query-devtools").then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

// DayJS module addition as per https://github.com/iamkun/dayjs/issues/1577
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const isDev = process.env.NODE_ENV === "development";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    if (!isDev) {
      router.events.on("routeChangeComplete", handleRouteChange);

      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  // Initialize AOS (Animate on Scroll Library) see https://michalsnik.github.io/aos/
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: FIVE_MINS } },
      })
  );

  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <AppInsightsProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-left"
            />
          )}
        </QueryClientProvider>
      </AppInsightsProvider>
      <ChatBaseBot />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GOOGLE_GTM_ID} />
    </>
  );
};

export default App;
