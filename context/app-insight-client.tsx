"use client";

import {
  AppInsightsContext,
  ReactPlugin,
} from "@microsoft/applicationinsights-react-js";
import React, { ReactNode, useEffect, useMemo } from "react";

export function AppInsightsProvider({ children }: { children: ReactNode }) {
  const reactPlugin = useMemo(() => new ReactPlugin(), []);
  useEffect(() => {
    // Configuration options with defaults for cost optimization
    const clientSamplingPercentageRaw = parseFloat(
      process.env.NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE || "20"
    );
    // Validate sampling percentage is between 1 and 100, default to 20 if invalid
    const clientSamplingPercentage =
      !isNaN(clientSamplingPercentageRaw) &&
      clientSamplingPercentageRaw >= 1 &&
      clientSamplingPercentageRaw <= 100
        ? clientSamplingPercentageRaw
        : 20;

    let loaded: { unload: () => void } | undefined;
    let unmounted = false;

    // applicationinsights-web is ~271 KB and nothing renders from it, so it is
    // imported here rather than at module scope to keep it out of the bundle
    // every page loads up front.
    void import("@microsoft/applicationinsights-web").then(
      ({ ApplicationInsights }) => {
        if (unmounted) return;

        const appInsights = new ApplicationInsights({
          config: {
            connectionString:
              process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING,
            extensions: [reactPlugin],
            samplingPercentage: clientSamplingPercentage, // Apply client-side sampling
            autoExceptionInstrumented: true, // Always track exceptions
            autoTrackPageVisitTime: true,
            enableRequestHeaderTracking: true,
            enableResponseHeaderTracking: true,
            enableAjaxErrorStatusText: true,
            distributedTracingMode: 0,
            loggingLevelTelemetry: 1,
            loggingLevelConsole: 1,
            extensionConfig: {
              [reactPlugin.identifier]: {},
            },
            disablePageUnloadEvents: ["unload"],
          },
        });

        if (appInsights.config.connectionString) {
          appInsights.loadAppInsights();
          loaded = appInsights;
          // eslint-disable-next-line no-console
          console.log("✅ App Insights - Client Side logging is turned on!");
          // eslint-disable-next-line no-console
          console.log(`   📊 Client Sampling: ${clientSamplingPercentage}%`);
        } else {
          // eslint-disable-next-line no-console
          console.log("Client side logging is not turned on!");
        }
      }
    );

    return () => {
      unmounted = true;
      loaded?.unload();
    };
  }, [reactPlugin]);

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
}
