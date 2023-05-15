import React, { useEffect } from "react";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import {
  ReactPlugin,
  withAITracking,
  AppInsightsContext,
} from "@microsoft/applicationinsights-react-js";
import { createBrowserHistory } from "history";

let browserHistory = null;
if (typeof document !== "undefined") {
  browserHistory = createBrowserHistory();
}
const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING,
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
    appInsights.loadAppInsights();
  }, []);

  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
};

export default withAITracking(reactPlugin, AzureAppInsights);
