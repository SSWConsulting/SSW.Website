import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import {
  flushWebVitals,
  resetWebVitalsSink,
  trackWebVital,
} from "./app-insights-web-vitals-buffer";

describe("web-vitals buffer", () => {
  beforeEach(() => resetWebVitalsSink());

  it("buffers metrics reported before flush, replays them in order, then passes through", () => {
    const sink = jest.fn();

    // Reported before the SDK is ready -> buffered, not sent yet.
    trackWebVital({ name: "LCP", average: 1 }, { page: "/a" });
    trackWebVital({ name: "CLS", average: 2 }, { page: "/a" });
    expect(sink).not.toHaveBeenCalled();

    // SDK ready -> buffered metrics replay in order.
    flushWebVitals(sink);
    expect(sink).toHaveBeenCalledTimes(2);
    expect(sink).toHaveBeenNthCalledWith(
      1,
      { name: "LCP", average: 1 },
      { page: "/a" }
    );
    expect(sink).toHaveBeenNthCalledWith(
      2,
      { name: "CLS", average: 2 },
      { page: "/a" }
    );

    // Reported after flush -> straight through, no double-send of the buffer.
    trackWebVital({ name: "INP", average: 3 }, { page: "/b" });
    expect(sink).toHaveBeenCalledTimes(3);
    expect(sink).toHaveBeenNthCalledWith(
      3,
      { name: "INP", average: 3 },
      { page: "/b" }
    );
  });

  it("re-buffers after reset and replays to a fresh sink without double-sending the old one (StrictMode/remount)", () => {
    const firstSink = jest.fn();
    trackWebVital({ name: "LCP", average: 1 }, { page: "/a" });
    flushWebVitals(firstSink);
    expect(firstSink).toHaveBeenCalledTimes(1);

    // Provider unmounts -> sink cleared, later metrics buffer again.
    resetWebVitalsSink();
    trackWebVital({ name: "INP", average: 2 }, { page: "/b" });
    expect(firstSink).toHaveBeenCalledTimes(1); // no send to the unloaded sink

    // Fresh SDK on remount -> only the post-reset metric replays, once.
    const secondSink = jest.fn();
    flushWebVitals(secondSink);
    expect(secondSink).toHaveBeenCalledTimes(1);
    expect(secondSink).toHaveBeenNthCalledWith(
      1,
      { name: "INP", average: 2 },
      { page: "/b" }
    );
    expect(firstSink).toHaveBeenCalledTimes(1); // old sink never re-fired
  });
});
