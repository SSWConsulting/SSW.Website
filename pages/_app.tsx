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
import "ssw.megamenu/dist/style.css";
import "../styles.css";

import ZendeskButton from "../components/zendeskButton/zendeskButton";
const zendesk = process.env.NEXT_PUBLIC_ZENDESK_CHAT_KEY;
// Hack as per https://stackoverflow.com/a/66575373 to stop font awesome icons breaking
import "@fortawesome/fontawesome-svg-core/styles.css";
import AzureAppInsights from "../context/appInsight_ui";

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
