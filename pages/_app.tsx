import { DefaultSeo } from "next-seo";
import { NEXT_SEO_DEFAULT } from '../next-seo.config';
import "react-responsive-modal/styles.css";
import "../styles.css";
import '@fontsource/open-sans/300.css';

const App = ({ Component, pageProps }) => {
  return (
    <>  
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
