"use client";

import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

export const WebVitals = () => {
  const appInsights = useAppInsightsContext();
  const pathname = usePathname();

  // Check if Web Vitals tracking is enabled (default: true)
  const trackWebVitals =
    process.env.NEXT_PUBLIC_APPINSIGHTS_TRACK_WEB_VITALS !== "false";

  useReportWebVitals((metric) => {
    // Only track if enabled via environment variable
    if (!trackWebVitals) return;

    switch (metric.name) {
      case "TTFB":
      case "FCP":
      case "LCP":
      case "FID":
      case "CLS":
      case "INP":
        appInsights?.trackMetric(
          { name: metric.name, average: metric.value },
          { page: `${pathname}` }
        );
        break;
    }
  });
  return <></>;
};
