import { useEffect, useState } from "react";
import styles from "./zendeskButton.module.css";

const ZendeskButton = ({ zendeskKey }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const script = document.getElementById("ze-snippet");
    setLoaded(!!script);
  }, []);

  const loadZenDesk = () => {
    if (!zendeskKey || zendeskKey === "undefined" || loaded) return;

    const zdscript = document.createElement("script");
    zdscript.setAttribute("id", "ze-snippet");
    zdscript.src = `https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`;
    document.getElementsByTagName("body")[0].appendChild(zdscript);

    zdscript.onload = (event) => {
      if (event.type === "load") setLoaded(true);
    };
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

export default ZendeskButton;
