"use client";
import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";

import { ReadonlyURLSearchParams, usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";

type TelemetryProviderProps = {
  params: ReadonlyURLSearchParams | null;
};
export const TelemetryProvider = ({ params }: TelemetryProviderProps) => {
  const appInsights = useAppInsightsContext();
  const path = usePathname();
  if (params !== null) {
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
  }
  return <></>;
};
