"use client";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import React, { useEffect } from "react";
function GlobalErrorHandler({ error, children }) {
  const appInsights = useAppInsightsContext();
  // eslint-disable-next-line no-console
  console.error("ErrorBoundary caught an error", error);
  useEffect(() => {
    if (!appInsights)
      // eslint-disable-next-line no-console
      console.log("AppInsights not initialized");
    // eslint-disable-next-line no-console
    else console.log("AppInsights initialized");

    try {
      // eslint-disable-next-line no-console
      appInsights.trackException({
        exception: error,
        properties: {
          Request: `GET /${window?.location?.pathname || "unknown"}`,
          Type: "ErrorBoundary",
          ErrorInfo: error.stack || error.message,
        },
      });
      // eslint-disable-next-line no-console
      console.log("error", error);
      // eslint-disable-next-line no-console
      console.log("appInsights client", appInsights);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Error in tracking exception", e.message);
    }
  }, [appInsights, error]);
  return <>{children}</>;
}

export default GlobalErrorHandler;
