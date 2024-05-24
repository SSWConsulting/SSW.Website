if (!!process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING) {
  let appInsights = require("applicationinsights");

  appInsights
    // eslint-disable-next-line no-undef
    .setup(process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING)
    .setAutoCollectConsole(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectRequests(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .setSendLiveMetrics(true);
  appInsights.defaultClient.addTelemetryProcessor((envelope, context) => {
    if (envelope.data.baseType === "RequestData") {
      envelope.data.baseData.properties ??= {};
      if (context["http.ServerRequest"].headers["user-agent"])
        envelope.data.baseData.properties.userAgent =
          context["http.ServerRequest"].headers["user-agent"];
    }
  });
  appInsights.start();
} else {
  console.log("🚨 App Insights - Server Side logging is not turned on!");
}
