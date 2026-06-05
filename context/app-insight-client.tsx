"use client";

import {
  AppInsightsContext,
  ReactPlugin,
} from "@microsoft/applicationinsights-react-js";
import React, { ReactNode, useEffect, useMemo } from "react";

export function AppInsightsProvider({ children }: { children: ReactNode }) {
  const reactPlugin = useMemo(() => new ReactPlugin(), []);
  useEffect(() => {
    let appInsights: { unload: () => void } | undefined;
    let cancelled = false;

    // Defer loading the heavy applicationinsights-web SDK until the browser is
    // idle so it stays out of the critical bundle/main-thread on first paint.
    const init = async () => {
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

      if (!process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING) {
        // eslint-disable-next-line no-console
        console.log("Client side logging is not turned on!");
        return;
      }

      const { ApplicationInsights } = await import(
        "@microsoft/applicationinsights-web"
      );
      if (cancelled) return;

      const instance = new ApplicationInsights({
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
      instance.loadAppInsights();
      appInsights = instance;
      // eslint-disable-next-line no-console
      console.log("✅ App Insights - Client Side logging is turned on!");
      // eslint-disable-next-line no-console
      console.log(`   📊 Client Sampling: ${clientSamplingPercentage}%`);
    };

    const ric: number =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(() => init(), { timeout: 4000 })
        : window.setTimeout(() => init(), 2000);

    return () => {
      cancelled = true;
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(ric);
      } else {
        window.clearTimeout(ric);
      }
      appInsights?.unload();
    };
  }, [reactPlugin]);

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
}
