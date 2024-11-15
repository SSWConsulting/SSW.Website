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
      console.log("Tracking exception");
      appInsights.trackException({
        exception: error,
        properties: {
          Request: `GET /${window?.location?.pathname || "unknown"}`,
          Type: "ErrorBoundary",
          ErrorInfo: error.stack || error.message,
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Error in tracking exception", e.message);
    }
  });
  return <>{children}</>;
}

export default GlobalErrorHandler;
