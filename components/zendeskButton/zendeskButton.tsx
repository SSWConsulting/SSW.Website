import Script from "next/script";
import { useEffect, useState } from "react";
import { useMaxRetries } from "./useMaxRetries";

import styles from "./zendeskButton.module.css";

// https://support.zendesk.com/hc/en-us/articles/4408824378650-Zendesk-In-Product-Cookie-Policy
const ZDwidgetOpen = "ZD-widgetOpen";

const zendeskLoaded = () => {
  const xframe = document.querySelector(
    "iframe[title='Button to launch messaging window']"
  ) as HTMLIFrameElement;
  return !!xframe;
};

const ZendeskButton = ({ zendeskKey }) => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const checkLoaded = () => {
    if (zendeskLoaded()) setLoaded(true);
  };

  const { start } = useMaxRetries(checkLoaded, {
    max: 20,
    interval: 200,
  });

  const handleClick = () => {
    sessionStorage.setItem("ZD-widgetOpen", "true");
    setOpen(true);
    start();
  };

  useEffect(() => {
    const loaded = zendeskLoaded();
    setLoaded(loaded);

    const widgetOpen = sessionStorage.getItem(ZDwidgetOpen);
    if (widgetOpen === "true" && !loaded) {
      start();
    }
  }, []);

  if (!loaded)
    return (
      <>
        <button
          className={styles["zendesk-button"]}
          role="button"
          aria-label="zendesk"
          onClick={handleClick}
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
        {open && (
          <Script
            async
            src={`https://static.zdassets.com/ekr/snippet.js?key=${zendeskKey}`}
            id="ze-snippet"
            strategy="afterInteractive"
          />
        )}
      </>
    );

  return null;
};

export default ZendeskButton;
