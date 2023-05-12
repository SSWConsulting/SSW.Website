let appInsights = require("applicationinsights");

appInsights
  .setup(
    "InstrumentationKey=678d37bd-bf60-4659-ba18-af565629f076;IngestionEndpoint=https://eastus-8.in.applicationinsights.azure.com/;LiveEndpoint=https://eastus.livediagnostics.monitor.azure.com/"
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
