import AOS from "aos";
import "aos/dist/aos.css";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Analytics } from "../components/layout/analytics";
import * as gtag from "../lib/gtag";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
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
  useEffect(() => AOS.init({ duration: 1200 }));

  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
};

export default App;
