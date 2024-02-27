import { useAppInsightsContext } from "@microsoft/applicationinsights-react-js";
import { useEffect } from "react";

export const AppInsightTest = () => {
  const appInsights = useAppInsightsContext();

  useEffect(() => {
    appInsights.trackEvent({ name: "testing frontend event on production" });
  }, [appInsights]);

  return <></>;
};
