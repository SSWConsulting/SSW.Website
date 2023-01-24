import { Analytics } from "../components/layout/analytics";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
import AOS from "aos";
import * as gtag from "../lib/gtag";
import "aos/dist/aos.css";
import "../styles.css";

const isDev = process.env.NODE_ENV === "development";

const App = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };

    if(!isDev){
      router.events.on("routeChangeComplete", handleRouteChange);
      
      return () => {
        router.events.off("routeChangeComplete", handleRouteChange);
      };
    }
  }, [router.events]);

  // Initialize AOS (Animate on Scroll Library) see https://michalsnik.github.io/aos/ 
  useEffect(() => AOS.init({ duration: 1200, once: true }));

  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
      { !isDev && <Analytics /> }
    </>
  );
};

export default App;
