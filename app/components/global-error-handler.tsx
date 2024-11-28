"use client";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import React, { useEffect } from "react";
function GlobalErrorHandler({ error, children }) {
  const appInsights = useAppInsightsContext();
  useEffect(() => {
    if (!appInsights) {
      // eslint-disable-next-line no-console
      console.error("AppInsights not initialized");
    }

    try {
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
