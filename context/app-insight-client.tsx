"use client";

import {
  AppInsightsContext,
  ReactPlugin,
} from "@microsoft/applicationinsights-react-js";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import React, { ReactNode, useEffect, useMemo } from "react";

export function AppInsightsProvider({ children }: { children: ReactNode }) {
  const reactPlugin = useMemo(() => new ReactPlugin(), []);
  useEffect(() => {
    // Configuration options with defaults for cost optimization
    const clientSamplingPercentage = parseFloat(
      process.env.NEXT_PUBLIC_APPINSIGHTS_CLIENT_SAMPLING_PERCENTAGE || "20"
    );

    const appInsights = new ApplicationInsights({
      config: {
        connectionString: process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING,
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
      // eslint-disable-next-line no-console
      console.log("✅ App Insights - Client Side logging is turned on!");
      console.log(`   📊 Client Sampling: ${clientSamplingPercentage}%`);
    } else {
      // eslint-disable-next-line no-console
      console.log("Client side logging is not turned on!");
    }

    return () => {
      appInsights.unload();
    };
  }, [reactPlugin]);

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
}
