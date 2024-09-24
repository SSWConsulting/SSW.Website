"use client";

import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

export const WebVitals = () => {
  const appInsights = useAppInsightsContext();
  const pathname = usePathname();
  console.log("🚀 ~ WebVitals ~ pathname:", pathname);

  useReportWebVitals((metric) => {
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
