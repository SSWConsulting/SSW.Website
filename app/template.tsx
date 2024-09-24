import React from "react";
import { TelemetryProvider } from "./components/TelemetryProvider";
const Template = ({ children }) => {
  return <TelemetryProvider>{children}</TelemetryProvider>;
};

export default Template;
