"use client";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";

import {
  ReadonlyURLSearchParams,
  usePathname,
  useSearchParams,
} from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
export const TelemetryProvider = ({ children }) => {
  const appInsights = useAppInsightsContext();
  const path = usePathname();
  const params: ReadonlyURLSearchParams = useSearchParams();

  const p = useSearchParams();
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case "TTFB":
      case "FCP":
      case "LCP":
      case "FID":
      case "CLS":
      case "INP":
        appInsights.trackMetric(
          { name: metric.name, average: metric.value },
          { page: `${path}${params.toString()}` }
        );
        break;
    }
  });
  return <>{children};</>;
};
