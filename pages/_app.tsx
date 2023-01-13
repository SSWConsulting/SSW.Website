import { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";

import "../styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

const App = ({ Component, pageProps }) => {
  useEffect(() => AOS.init({duration: 1200}));
  
  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
