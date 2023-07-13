import { Partytown } from "@builder.io/partytown/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { DefaultSeo } from "next-seo";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "react-responsive-modal/styles.css";
import "react-tooltip/dist/react-tooltip.css";
import "ssw.megamenu/dist/style.css";
import { Analytics } from "../components/layout/analytics";
import * as gtag from "../lib/gtag";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
import "../styles.css";

import ZendeskButton from "../components/zendeskButton/zendeskButton";
import AzureAppInsights from "../context/app-insight-client";
const zendesk = process.env.NEXT_PUBLIC_ZENDESK_CHAT_KEY;
// Hack as per https://stackoverflow.com/a/66575373 to stop font awesome icons breaking
import "@fortawesome/fontawesome-svg-core/styles.css";

// DayJS module addition as per https://github.com/iamkun/dayjs/issues/1577
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { proxiedWhitelist } from "../components/util/constants/partytown";

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
      <Head>
        <Partytown
          debug={false}
          forward={["gtag", "dataLayer.push", "_hsq.push, fbq"]}
          resolveUrl={(url, location) => {
            if (proxiedWhitelist.includes(url.hostname)) {
              const proxiedUrl = new URL(`${location.origin}/api/proxy`);
              proxiedUrl.searchParams.append(
                "url",
                encodeURIComponent(url.href)
              );
              return proxiedUrl;
            }
            return url;
          }}
        />
      </Head>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <AzureAppInsights>
        <Component {...pageProps} />
      </AzureAppInsights>
      <ZendeskButton zendeskKey={zendesk} />
      <Analytics />
    </>
  );
};

export default App;
