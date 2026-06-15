"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Script from "next/script";
import React, { useEffect, useId, useState } from "react";
import RippleButton, { ColorVariant } from "../button/rippleButtonV2";
import Popup from "../popup/popup";

// Region-specific (.com.au): matches the AU events this component is used for.
// Change the TLD if it is ever reused for events on another Eventbrite domain.
const EVENTBRITE_DOMAIN = "https://www.eventbrite.com.au";
const EVENTBRITE_WIDGET_SRC = `${EVENTBRITE_DOMAIN}/static/widgets/eb_widgets.js`;

// Why an INLINE widget inside our own Popup instead of Eventbrite's native
// modal: any themeSettings make the native modal paint an opaque layer across
// its viewport-sized iframe (hiding the page), and its backdrop is an
// unstylable plum scrim. Eventbrite offers no font control either way.
const THEME_SETTINGS = {
  brandColor: "#cc4141",
  fontColor: "#333333",
  background: "#ffffff",
};

const CHECKOUT_WIDTH_PX = 960;
const CHECKOUT_HEIGHT_PX = 720;
// How long after opening to wait for eb_widgets.js before showing a fallback
// link (ad/privacy blockers commonly block the script).
const SCRIPT_TIMEOUT_MS = 4000;

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: {
        widgetType: "checkout";
        eventId: string;
        iframeContainerId?: string;
        iframeContainerHeight?: number;
        onOrderComplete?: () => void;
        themeSettings?: {
          brandColor?: string;
          fontColor?: string;
          background?: string;
        };
      }) => void;
    };
  }
}

type EventbriteModalButtonProps = {
  /** Numeric Eventbrite event ID, e.g. eventbrite.com/e/<name>-<EVENT_ID>. */
  eventId: string;
  variant: ColorVariant;
  className?: string;
  textTinaField?: string;
  children: React.ReactNode;
};

/**
 * Renders a button that opens an Eventbrite checkout in a site Popup. The
 * checkout is Eventbrite's inline embed mounted when the popup opens, so the
 * page never pays the embed cost on load. Closing destroys the widget, so
 * each open gets a fresh container and a fresh widget.
 */
export const EventbriteModalButton = ({
  eventId,
  variant,
  className,
  textTinaField,
  children,
}: EventbriteModalButtonProps) => {
  // Unique per mounted instance — the same event can appear on many cards.
  const reactId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const containerId = `eventbrite-checkout-${eventId}-${reactId}`;
  const [open, setOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);
  // Callback-ref state: the popup renders through a portal, so the container
  // is NOT in the DOM in the same commit that sets `open` — binding must wait
  // for the node itself to mount, not for the open flag.
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  // The script may already be present after a client-side navigation back.
  useEffect(() => {
    if (typeof window !== "undefined" && window.EBWidgets)
      setScriptLoaded(true);
  }, []);

  // next/script dedupes the shared eb_widgets.js, so this instance's onReady
  // may never fire even though the script is loaded — that left scriptLoaded
  // false and tripped the fallback on a perfectly good script (e.g. only one
  // card binding while the others showed "could not be loaded"). Poll the
  // global instead: window.EBWidgets is the reliable readiness signal for
  // every instance. Only fall back if it never appears within the timeout.
  useEffect(() => {
    if (!open || scriptLoaded) return;
    if (window.EBWidgets) {
      setScriptLoaded(true);
      return;
    }
    // Retry on each open so a card that previously timed out can recover.
    setScriptFailed(false);
    const started = Date.now();
    const timer = setInterval(() => {
      if (window.EBWidgets) {
        setScriptLoaded(true);
        clearInterval(timer);
      } else if (Date.now() - started >= SCRIPT_TIMEOUT_MS) {
        setScriptFailed(true);
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, [open, scriptLoaded]);

  useEffect(() => {
    if (!containerEl || !scriptLoaded || !window.EBWidgets) return;
    // Re-runs (StrictMode, dep changes) must not stack a second iframe.
    // Safe because createWidget appends the iframe synchronously.
    if (containerEl.querySelector("iframe")) return;
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: containerId,
      iframeContainerHeight: CHECKOUT_HEIGHT_PX,
      themeSettings: THEME_SETTINGS,
      onOrderComplete: () => {
        // Conversion hook via the app's GTM container (@next/third-parties),
        // so Facebook Pixel "Lead" and CRM tagging can fire downstream.
        sendGTMEvent({ event: "eventbrite_order_complete", eventId });
      },
    });
  }, [containerEl, scriptLoaded, containerId, eventId]);

  return (
    <>
      <Script
        src={EVENTBRITE_WIDGET_SRC}
        strategy="afterInteractive"
        // next/script dedupes by src, so with many buttons only one instance
        // actually loads it. onReady (unlike onLoad) fires for every instance
        // once the shared script is ready, so no card is left unbound.
        onReady={() => setScriptLoaded(true)}
        onError={() => setScriptFailed(true)}
      />
      <RippleButton
        type="button"
        variant={variant}
        className={className}
        textTinaField={textTinaField}
        onClick={() => setOpen(true)}
      >
        {children}
      </RippleButton>
      {/* Always mounted so the close animation plays; the library removes the
          popup contents from the DOM while closed, which is what resets the
          widget between opens. */}
      <Popup
        isVisible={open}
        showCloseIcon
        onClose={() => setOpen(false)}
        // No padding (it reads as a white border around the checkout); round
        // and clip the box so wrapper and content share the same corners.
        modalStyle={{
          maxWidth: CHECKOUT_WIDTH_PX,
          padding: 0,
          borderRadius: "0.375rem", // rounded-md, matching the site cards
          overflow: "hidden",
          background: THEME_SETTINGS.background,
        }}
      >
        {scriptFailed && !scriptLoaded ? (
          <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <p>The booking form could not be loaded.</p>
            <a
              href={`${EVENTBRITE_DOMAIN}/e/${eventId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sswRed underline"
            >
              Register on the Eventbrite event page instead
            </a>
          </div>
        ) : (
          <div
            ref={setContainerEl}
            id={containerId}
            className="w-full"
            // Height capped so the modal stays inside short viewports;
            // Eventbrite sets the iframe to the full height, so the capped
            // container must scroll or the payment button gets clipped.
            style={{
              height: `min(${CHECKOUT_HEIGHT_PX}px, 85vh)`,
              overflowY: "auto",
              backgroundColor: THEME_SETTINGS.background,
            }}
          />
        )}
      </Popup>
    </>
  );
};
