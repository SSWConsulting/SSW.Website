import { AppInsightsProvider } from "@/context/app-insight-client";
import React from "react";
import { TelemetryProvider } from "./components/TelemetryProvider";
const Template = ({ children }) => {
  return (
    <AppInsightsProvider>
      <TelemetryProvider>{children}</TelemetryProvider>
    </AppInsightsProvider>
  );
};

export default Template;
