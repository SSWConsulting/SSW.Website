import { useEffect } from 'react';
import { DefaultSeo } from 'next-seo';
import { NEXT_SEO_DEFAULT } from '../next-seo.config';

import "../styles.css";
import AOS from "aos";
import "aos/dist/aos.css";

const App = ({ Component, pageProps }) => {
  // Initialize AOS (Animate on Scroll Library) see https://michalsnik.github.io/aos/ 
  useEffect(() => AOS.init({ duration: 1200, once: true }));

  return (
    <>
      <DefaultSeo {...NEXT_SEO_DEFAULT} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
