"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useEffect, useState } from "react";

/**
 * Loads Google Tag Manager off the critical path to reduce Total Blocking Time.
 *
 * GTM (and the tags it injects: Clarity, Hotjar, LinkedIn, Facebook Pixel) is
 * the single largest third-party main-thread cost on first load. None of our
 * own code calls `sendGTMEvent`/`dataLayer` — every tag fires inside the
 * container — so it is safe to delay loading until the page is interactive.
 *
 * It loads on the first user interaction OR when the browser goes idle,
 * whichever comes first. The idle callback uses a timeout so the script is
 * always loaded (within ~3.5s) even for sessions with no interaction, so
 * pageview tracking is preserved.
 */
export function DeferredGoogleTagManager({ gtmId }: { gtmId?: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!gtmId || typeof window === "undefined") return;

    let triggered = false;
    const interactionEvents = [
      "scroll",
      "mousemove",
      "touchstart",
      "keydown",
      "click",
    ];

    const cleanup = () => {
      interactionEvents.forEach((event) =>
        window.removeEventListener(event, trigger)
      );
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };

    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setShouldLoad(true);
      cleanup();
    };

    interactionEvents.forEach((event) =>
      window.addEventListener(event, trigger, { once: true, passive: true })
    );

    // Guaranteed fallback: load on idle, or after the timeout regardless.
    const idleId: number =
      typeof window.requestIdleCallback === "function"
        ? window.requestIdleCallback(trigger, { timeout: 3500 })
        : window.setTimeout(trigger, 3500);

    return cleanup;
  }, [gtmId]);

  if (!shouldLoad || !gtmId) return null;
  return <GoogleTagManager gtmId={gtmId} />;
}
