"use client";

import { loadAppInsights } from "@/lib/app-insights";
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

    let loaded: { unload: () => void } | null = null;
    let unmounted = false;

    void loadAppInsights({
      reactPlugin,
      samplingPercentage: clientSamplingPercentage,
    }).then((appInsights) => {
      if (unmounted) {
        appInsights?.unload();
        return;
      }

      loaded = appInsights;
      if (appInsights) {
        // eslint-disable-next-line no-console
        console.log("✅ App Insights - Client Side logging is turned on!");
        // eslint-disable-next-line no-console
        console.log(`   📊 Client Sampling: ${clientSamplingPercentage}%`);
      } else {
        // eslint-disable-next-line no-console
        console.log("Client side logging is not turned on!");
      }
    });

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
