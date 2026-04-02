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
    
    const enableConsoleCollection =
      process.env.APPINSIGHTS_ENABLE_CONSOLE_COLLECTION === "true"; // Default: false
    const collectNativeConsoleMethods =
      process.env.APPINSIGHTS_COLLECT_NATIVE_CONSOLE === "true"; // Default: false
    const enableLiveMetrics =
      process.env.APPINSIGHTS_ENABLE_LIVE_METRICS === "true"; // Default: false

    appInsights
      .setup(process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING)
      .setAutoCollectConsole(enableConsoleCollection, collectNativeConsoleMethods) // First param: enable collection, Second param: include native console.log etc.
      .setAutoCollectExceptions(true) // Always track exceptions
      .setAutoCollectRequests(true)
      .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
      .setSendLiveMetrics(enableLiveMetrics);

    // Apply sampling configuration before starting
    if (appInsights.defaultClient) {
      appInsights.defaultClient.config.samplingPercentage = samplingPercentage;
    }

    appInsights.start();

    // Add telemetry processor to capture user-agent on requests
    if (appInsights.defaultClient) {
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
      console.log(`   🔍 Console Collection: ${enableConsoleCollection ? "Enabled" : "Disabled"}`);
      console.log(`   📝 Native Console Methods: ${collectNativeConsoleMethods ? "Tracked" : "Not tracked"}`);
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
