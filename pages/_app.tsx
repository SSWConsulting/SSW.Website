import analytics from "../analytics";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
import "../styles.css";
import { hotjar } from "react-hotjar";

const App = ({ Component, pageProps }) => {
  useEffect(() =>{
    analytics.page();

    if(process.env.NODE_ENV !== "development"){
      hotjar.initialize(parseInt(process.env.NEXT_PUBLIC_HOTJAR_ID), parseInt(process.env.NEXT_PUBLIC_HOTJAR_SV))
    }
  }, [])

  return (
    <>  
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
