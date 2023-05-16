import React, { useEffect } from "react";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import {
  ReactPlugin,
  withAITracking,
  AppInsightsContext,
} from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";

let browserHistory = null;

if (typeof document != "undefined") {
  browserHistory = createBrowserHistory();
}

const reactPlugin = new ReactPlugin();

const appInsightConnString =
  process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING;

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: appInsightConnString,
    enableAutoRouteTracking: true,
    enableAjaxPerfTracking: true,
    isBrowserLinkTrackingEnabled: true,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: { history: browserHistory },
    },
  },
});

const AzureAppInsights = ({ children }) => {
  useEffect(() => {
    if (appInsightConnString) {
      appInsights.loadAppInsights();
    } else {
      console.log("Client side logging is not turned on!");
    }
  }, []);

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
};

export default withAITracking(reactPlugin, AzureAppInsights);
