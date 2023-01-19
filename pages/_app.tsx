import analytics from "../analytics";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
import "../styles.css";
import { hotjar } from "react-hotjar";
import Script from "next/script";

const zendeskKey = process.env.NEXT_PUBLIC_ZENDESK_CHAT_KEY;
const isDev = process.env.NODE_ENV === "development";

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    analytics.page();

    if (!isDev) {
      hotjar.initialize(
        parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID),
        parseInt(process.env.NEXT_PUBLIC_HOTJAR_SV)
      );
    }
  }, []);

  return (
    <>
      {!isDev && 
        <Script
          id="ze-snippet"
          src={`https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`}
        />
      }
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
