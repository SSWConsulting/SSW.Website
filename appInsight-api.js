import * as appInsights from "applicationinsights";

if (process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING) {
  appInsights
    .setup(process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING)
    .setAutoCollectConsole(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectRequests(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .setSendLiveMetrics(true);
  appInsights.defaultClient?.addTelemetryProcessor((envelope, context) => {
    if (envelope.data.baseType === "RequestData") {
      envelope.data.baseData.properties ??= {};
      if (context["http.ServerRequest"]?.headers["user-agent"])
        envelope.data.baseData.properties.userAgent =
          context["http.ServerRequest"].headers["user-agent"];
    }
  });
  appInsights.start();
  console.log("✅ App Insights - Server Side logging is turned on!");
} else {
  // eslint-disable-next-line no-console
  console.log(
    "🚨 App Insights - Server Side logging is not turned on, Please add NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING variable!"
  );
}

export default appInsights;
