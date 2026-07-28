import type { ReactPlugin } from "@microsoft/applicationinsights-react-js";

type LoadOptions = {
  reactPlugin: ReactPlugin;
  /**
   * Omitted by the global error boundary — sampling away four in five fatal
   * errors would defeat the point of a crash reporter.
   */
  samplingPercentage?: number;
};

/**
 * Resolves to null when no connection string is configured, so callers can log
 * their own message. applicationinsights-web is ~271 KB and nothing renders
 * from it, so it is imported here rather than at module scope to keep it out of
 * the bundle every page loads up front.
 */
export async function loadAppInsights({
  reactPlugin,
  samplingPercentage,
}: LoadOptions) {
  const connectionString =
    process.env.NEXT_PUBLIC_APP_INSIGHT_CONNECTION_STRING;
  if (!connectionString) return null;

  const { ApplicationInsights } = await import(
    "@microsoft/applicationinsights-web"
  );

  const appInsights = new ApplicationInsights({
    config: {
      connectionString,
      extensions: [reactPlugin],
      ...(samplingPercentage !== undefined && { samplingPercentage }),
      autoExceptionInstrumented: true,
      autoTrackPageVisitTime: true,
      enableRequestHeaderTracking: true,
      enableResponseHeaderTracking: true,
      enableAjaxErrorStatusText: true,
      distributedTracingMode: 0,
      loggingLevelTelemetry: 1,
      loggingLevelConsole: 1,
      extensionConfig: {
        [reactPlugin.identifier]: {},
      },
      disablePageUnloadEvents: ["unload"],
    },
  });

  appInsights.loadAppInsights();
  return appInsights;
}
