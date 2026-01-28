import * as appInsights from "applicationinsights";

if (process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING) {
  try {
    // Configuration options with defaults for cost optimization
    const samplingPercentageRaw = parseFloat(
      process.env.APPINSIGHTS_SAMPLING_PERCENTAGE || "20"
    );
    // Validate sampling percentage is between 1 and 100, default to 20 if invalid
    const samplingPercentage = 
      !isNaN(samplingPercentageRaw) && 
      samplingPercentageRaw >= 1 && 
      samplingPercentageRaw <= 100 
        ? samplingPercentageRaw 
        : 20;
    
    const consoleErrorsOnly =
      process.env.APPINSIGHTS_CONSOLE_ERRORS_ONLY !== "false"; // Default: true
    const enableLiveMetrics =
      process.env.APPINSIGHTS_ENABLE_LIVE_METRICS === "true"; // Default: false

    appInsights
      .setup(process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING)
      .setAutoCollectConsole(consoleErrorsOnly, consoleErrorsOnly) // Only errors if true
      .setAutoCollectExceptions(true) // Always track exceptions
      .setAutoCollectRequests(true)
      .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
      .setSendLiveMetrics(enableLiveMetrics);

    appInsights.start();

    // Apply sampling to requests and dependencies for cost reduction
    if (appInsights.defaultClient) {
      appInsights.defaultClient.config.samplingPercentage = samplingPercentage;

      // Add telemetry processor to capture user-agent on requests
      appInsights.defaultClient.addTelemetryProcessor((envelope, context) => {
        if (envelope.data.baseType === "RequestData") {
          envelope.data.baseData.properties ??= {};
          if (context["http.ServerRequest"]?.headers["user-agent"])
            envelope.data.baseData.properties.userAgent =
              context["http.ServerRequest"].headers["user-agent"];
        }
        return true;
      });

      console.log("✅ App Insights - Server Side logging is turned on!");
      console.log(`   📊 Sampling: ${samplingPercentage}%`);
      console.log(`   🔍 Console: ${consoleErrorsOnly ? "Errors only" : "All logs"}`);
      console.log(`   📡 Live Metrics: ${enableLiveMetrics ? "Enabled" : "Disabled"}`);
    } else {
      console.error("❌ App Insights - Failed to initialize!");
    }
  } catch (error) {
    console.error(
      "🚨 App Insights - An error occurred while initializing:",
      error
    );
  }
} else {
  console.log(
    "🚨 App Insights - Server Side logging is not turned on, Please add NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING variable!"
  );
}

export default appInsights;
