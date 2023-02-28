import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

import styles from "./zendeskButton.module.css";

const ZendeskButton = ({ zendeskKey }) => {
  const [loaded, setLoaded] = useState(false);
  const zdscript = useRef<HTMLScriptElement>();
  const clickEvent = useRef<NodeJS.Timer>();
  const maxRetries = useRef<number>(20);
  const clicked = useRef<boolean>(false);

  useEffect(() => {
    const script = document.getElementById("ze-snippet");
    setLoaded(!!script);

    zdscript.current = document.createElement("script");
    zdscript.current.setAttribute("id", "ze-snippet");
    zdscript.current.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
    document.getElementsByTagName("body")[0].appendChild(zdscript.current);

    return () => {
      clickEvent.current && clearInterval(clickEvent.current);
      clickEvent.current = undefined;
      zdscript.current && zdscript.current.removeEventListener("load", handleScriptLoaded);
      zdscript.current = undefined;
      clicked.current = false;
      maxRetries.current = 20;
    };
  }, []);

  const handleScriptLoaded = (event) => {
    if (event.type === "load") {
      const clickButton = () => {
        if(clicked.current) return;
        setLoaded(true)
        const xframe = document.querySelector("iframe[title=\"Button to launch messaging window\"]") as HTMLIFrameElement;
        const doc = xframe?.contentDocument || xframe?.contentWindow.document;
        const zendeskNativeButton = doc?.querySelector("button");

        if (zendeskNativeButton) {
          zendeskNativeButton.click();
          clicked.current = true;
        }
      }

      const repeat = () => {
        clickButton();
        maxRetries.current = maxRetries.current - 1;
        if(maxRetries.current > 0 && !clicked.current) {
          clearTimeout(clickEvent.current);
          clickEvent.current = setTimeout(() => repeat(), 200);
        }
      }
      if(maxRetries.current > 0) {
        clickEvent.current = setTimeout(() => repeat(), 200);
      }
    }
  };

  const loadZenDesk = (e) => {
    e.preventDefault();
    if (!zendeskKey || zendeskKey === "undefined" || loaded) return;

    clickEvent.current && clearTimeout(clickEvent.current);
    maxRetries.current = 20;
    clicked.current = false;

    zdscript.current = document.createElement("script");
    zdscript.current.setAttribute("id", "ze-snippet");
    zdscript.current.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
    document.getElementsByTagName("body")[0].appendChild(zdscript.current);

    zdscript.current.addEventListener("load", handleScriptLoaded);
  };

  return (
    <button
      className={styles["zendesk-button"]}
      role="button"
      aria-label="zendesk"
      onClick={loadZenDesk}
    >
      <svg
        width="60%"
        height="60%"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <path
          fill="rgb(255,255,255)"
          d="M10,18 L6,22 L6,18 L10,18 Z M17,6 C19.7614237,6 22,8.23857625 22,11 C22,13.7614237 19.7614237,16 17,16 L17,16 L7,16 C4.23857625,16 2,13.7614237 2,11 C2,8.23857625 4.23857625,6 7,6 L7,6 Z"
          id="🎨icon-fill"
          transform="translate(12.000000, 14.000000) scale(-1, 1) translate(-12.000000, -14.000000) "
        ></path>
      </svg>
    </button>
  );
};

const LazyZendeskButton = dynamic(() => Promise.resolve(ZendeskButton), {
  ssr: false,
});

export default LazyZendeskButton;
