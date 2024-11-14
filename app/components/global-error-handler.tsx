"use client";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import React, { useEffect } from "react";
function GlobalErrorHandler({ error, children }) {
  const appInsights = useAppInsightsContext();
  // eslint-disable-next-line no-console
  console.error("ErrorBoundary caught an error", error);
  useEffect(() => {
    appInsights.trackException({
      exception: error,
      properties: {
        Request: `GET /${window?.location?.pathname || "unknown"}`,
        Type: "ErrorBoundary",
        ErrorInfo: error.stack || error.message,
      },
    });
  });
  return <>{children}</>;
}

export default GlobalErrorHandler;
