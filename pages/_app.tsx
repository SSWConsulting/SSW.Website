import AOS from "aos";
import "aos/dist/aos.css";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "react-responsive-modal/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import { Analytics } from "../components/layout/analytics";
import * as gtag from "../lib/gtag";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
import "../styles.css";

import { AppInsightsProvider } from "../context/app-insight-client";

// Hack as per https://stackoverflow.com/a/66575373 to stop font awesome icons breaking
import "@fortawesome/fontawesome-svg-core/styles.css";

import { ErrorBoundary } from "@/components/util/error-boundary";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";

const ChatBaseBot = dynamic(
  () => import("../components/zendeskButton/chatBaseBot"),
  {
    ssr: false,
  }
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

  return (
    <>
      <Analytics />
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <AppInsightsProvider>
        <ErrorBoundary key={router.asPath}>
          <Component {...pageProps} />
        </ErrorBoundary>
      </AppInsightsProvider>
      <ChatBaseBot />
    </>
  );
};

export default App;
