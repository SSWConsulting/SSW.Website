"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Script from "next/script";
import React, { useEffect, useId, useState } from "react";
import RippleButton, { ColorVariant } from "../button/rippleButtonV2";
import Popup from "../popup/popup";

// AU domain — change the TLD if reused for events on another Eventbrite domain.
const EVENTBRITE_DOMAIN = "https://www.eventbrite.com.au";
const EVENTBRITE_WIDGET_SRC = `${EVENTBRITE_DOMAIN}/static/widgets/eb_widgets.js`;

// Inline widget in our own Popup: Eventbrite's native modal paints an opaque
// layer over the page and its backdrop is unstylable.
const THEME_SETTINGS = {
  brandColor: "#cc4141", // raw hex; keep in sync with the sswRed token
  fontColor: "#333333",
  background: "#ffffff",
};

const CHECKOUT_WIDTH_PX = 960;
const CHECKOUT_HEIGHT_PX = 720;
// Fallback to a direct link if eb_widgets.js hasn't loaded by now (blockers).
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
 * Button that opens an Eventbrite checkout in a site Popup. The inline embed is
 * mounted on open (so the page never pays the embed cost on load) and destroyed
 * on close, so each open gets a fresh widget.
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
  // The popup portals its content, so bind once the node itself mounts (via the
  // callback ref), not when `open` flips.
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null);

  // Script may already be present after a client-side navigation back.
  useEffect(() => {
    if (typeof window !== "undefined" && window.EBWidgets)
      setScriptLoaded(true);
  }, []);

  // Poll window.EBWidgets for readiness; next/script's per-instance onReady can
  // stay unfired once the src is deduped. Fall back only after the timeout.
  useEffect(() => {
    if (!open || scriptLoaded) return;
    if (window.EBWidgets) {
      setScriptLoaded(true);
      return;
    }
    setScriptFailed(false); // retry on each open so a timed-out card can recover
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
    if (containerEl.querySelector("iframe")) return; // don't stack a second iframe on re-run
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: containerId,
      iframeContainerHeight: CHECKOUT_HEIGHT_PX,
      themeSettings: THEME_SETTINGS,
      onOrderComplete: () => {
        // Conversion hook for downstream GTM tags (Facebook Pixel, CRM).
        sendGTMEvent({ event: "eventbrite_order_complete", eventId });
      },
    });
  }, [containerEl, scriptLoaded, containerId, eventId]);

  return (
    <>
      {/* Loaded only after the first open, so the page never pays the script
          cost on load. next/script dedupes by src; onReady fires per instance. */}
      {open && (
        <Script
          src={EVENTBRITE_WIDGET_SRC}
          strategy="afterInteractive"
          onReady={() => setScriptLoaded(true)}
          onError={() => setScriptFailed(true)}
        />
      )}
      <RippleButton
        type="button"
        variant={variant}
        className={className}
        textTinaField={textTinaField}
        onClick={() => setOpen(true)}
      >
        {children}
      </RippleButton>
      {/* Always mounted (for the close animation); the library unmounts the
          contents while closed, which resets the widget between opens. */}
      <Popup
        isVisible={open}
        showCloseIcon
        onClose={() => setOpen(false)}
        modalStyle={{
          maxWidth: CHECKOUT_WIDTH_PX,
          padding: 0, // padding reads as a white border around the checkout
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
            // Capped height with scroll: Eventbrite sizes the iframe to full
            // height, which would clip the pay button in short viewports.
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
