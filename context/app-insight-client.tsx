"use client";

import {
  AppInsightsContext,
  ReactPlugin,
} from "@microsoft/applicationinsights-react-js";
import React, { ReactNode, useEffect, useMemo } from "react";
import {
  flushWebVitals,
  resetWebVitalsSink,
} from "./app-insights-web-vitals-buffer";

// Run the callback once the page is idle so App Insights init stays out of the
// critical/hydration window. Falls back to a timer where requestIdleCallback is
// unavailable (Safari < 17).
function whenIdle(cb: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(cb, { timeout: 5000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(cb, 1000);
  return () => window.clearTimeout(id);
}

export function AppInsightsProvider({ children }: { children: ReactNode }) {
  const reactPlugin = useMemo(() => new ReactPlugin(), []);

  useEffect(() => {
    let cancelled = false;
    let appInsights: { unload: () => void } | undefined;

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

      // Dynamic import keeps the ~ES5 SDK out of the route's initial chunk graph.
      const { ApplicationInsights } = await import(
        "@microsoft/applicationinsights-web"
      );
      if (cancelled) return;

      const ai = new ApplicationInsights({
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

      if (ai.config.connectionString) {
        ai.loadAppInsights();
        appInsights = ai;
        // Replay any web-vitals measured before the SDK was ready.
        flushWebVitals((metric, properties) =>
          reactPlugin.trackMetric(metric, properties)
        );
        // eslint-disable-next-line no-console
        console.log("✅ App Insights - Client Side logging is turned on!");
        // eslint-disable-next-line no-console
        console.log(`   📊 Client Sampling: ${clientSamplingPercentage}%`);
      } else {
        // eslint-disable-next-line no-console
        console.log("Client side logging is not turned on!");
      }
    };

    const cancelIdle = whenIdle(() => {
      void init();
    });

    return () => {
      cancelled = true;
      cancelIdle();
      resetWebVitalsSink();
      appInsights?.unload();
    };
  }, [reactPlugin]);

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
}
