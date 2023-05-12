let appInsights = require("applicationinsights");

appInsights
  .setup(
    "InstrumentationKey=9fce8146-edbc-46d4-8542-74da9fb75503;IngestionEndpoint=https://australiaeast-1.in.applicationinsights.azure.com/;LiveEndpoint=https://australiaeast.livediagnostics.monitor.azure.com/"
  )
  .setAutoCollectConsole(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectExceptions(true)
  .setAutoCollectHeartbeat(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectRequests(true)
  .setAutoDependencyCorrelation(true)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
  .setSendLiveMetrics(true)
  .setUseDiskRetryCaching(true);
appInsights.start();
