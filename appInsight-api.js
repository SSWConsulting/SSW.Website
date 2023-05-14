if (
  typeof process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING !== "undefined"
) {
  let appInsights = require("applicationinsights");

  appInsights
    // eslint-disable-next-line no-undef
    .setup(process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING)
    .setAutoCollectConsole(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectRequests(true)
    .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
    .setSendLiveMetrics(true);
  appInsights.start();
} else {
  console.log("Logging is not turned on!");
}
