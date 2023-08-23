import Script from "next/script";
import { useEffect, useState } from "react";
import { useMaxRetries } from "./useMaxRetries";

// https://support.zendesk.com/hc/en-us/articles/4408824378650-Zendesk-In-Product-Cookie-Policy
const ZDwidgetOpen = "ZD-widgetOpen";

const zendeskLoaded = () => {
  const xframe = document.querySelector(
    "iframe[title='Button to launch messaging window']"
  ) as HTMLIFrameElement;
  return !!xframe;
};

const ZendeskButton = () => {
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const checkLoaded = () => {
    if (zendeskLoaded()) setLoaded(true);
  };

  const { start } = useMaxRetries(checkLoaded, {
    max: 20,
    interval: 200,
  });

  useEffect(() => {
    const loaded = zendeskLoaded();
    setLoaded(loaded);

    const widgetOpen = sessionStorage.getItem(ZDwidgetOpen);
    if (widgetOpen === "true" && !loaded) {
      start();
      setOpen(true);
    }
  }, []);

  if (!loaded)
    return (
      <>
        {open && (
          <Script
            async
            src="https://www.chatbase.co/embed.min.js"
            id="8ZT43FdIerlr8zuOP7D5s"
          />
        )}
      </>
    );

  return null;
};

export default ZendeskButton;
