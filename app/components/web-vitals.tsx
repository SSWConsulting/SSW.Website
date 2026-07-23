"use client";

import { trackWebVital } from "@/context/app-insights-web-vitals-buffer";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

export const WebVitals = () => {
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
        // Buffered until App Insights loads (init is deferred), then flushed —
        // so metrics measured before init are not lost.
        trackWebVital(
          { name: metric.name, average: metric.value },
          { page: `${pathname}` }
        );
        break;
    }
  });
  return <></>;
};
