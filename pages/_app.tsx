import analytics from "../analytics";
import { DefaultSeo } from "next-seo";
import { useEffect } from "react";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
import "../styles.css";

const App = ({ Component, pageProps }) => {
  useEffect(() =>{
    analytics.page();
  }, [])

  return (
    <>  
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
