// Buffers web-vitals metrics reported before App Insights finishes loading.
// Init is deferred out of the critical window (see app-insight-client.tsx), so
// early metrics (LCP/FCP/TTFB fired during hydration) would otherwise be lost.
// They queue here and replay on flush once the SDK is ready.

type WebVitalMetric = { name: string; average: number };
type WebVitalProperties = { page: string };

type MetricSink = (
  metric: WebVitalMetric,
  properties: WebVitalProperties
) => void;

let sink: MetricSink | null = null;
const buffer: Array<{
  metric: WebVitalMetric;
  properties: WebVitalProperties;
}> = [];

export function trackWebVital(
  metric: WebVitalMetric,
  properties: WebVitalProperties
) {
  if (sink) {
    sink(metric, properties);
  } else {
    buffer.push({ metric, properties });
  }
}

// Called once App Insights has loaded: drains the buffer in order and routes
// all subsequent metrics straight through.
export function flushWebVitals(nextSink: MetricSink) {
  sink = nextSink;
  for (const { metric, properties } of buffer) {
    nextSink(metric, properties);
  }
  buffer.length = 0;
}

// Called on provider unmount so metrics buffer again against a fresh SDK
// (e.g. React StrictMode's mount/unmount/mount in dev).
export function resetWebVitalsSink() {
  sink = null;
}
