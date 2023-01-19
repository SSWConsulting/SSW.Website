import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from "../next-seo.config";
import "../styles.css";

const App = ({ Component, pageProps }) => {
  return (
    <>  
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
