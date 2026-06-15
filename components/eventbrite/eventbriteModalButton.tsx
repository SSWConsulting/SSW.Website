"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import Script from "next/script";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import RippleButton, { ColorVariant } from "../../button/rippleButtonV2";

// Region-specific (.com.au): matches the AU events this component is used for.
// Change the TLD if it is ever reused for events on another Eventbrite domain.
const EVENTBRITE_WIDGET_SRC =
  "https://www.eventbrite.com.au/static/widgets/eb_widgets.js";

// SSW dark theme so Eventbrite's checkout matches the event pages.
const THEME_SETTINGS = {
  brandColor: "#cc4141",
  fontColor: "#cccccc",
  background: "#181818",
};

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: {
        widgetType: "checkout";
        eventId: string;
        modal?: boolean;
        modalTriggerElementId?: string;
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
 * Renders a button that opens an Eventbrite checkout in Eventbrite's native
 * modal. The checkout iframe is only created when the button is clicked, so the
 * page never pays the embed cost on load. Eventbrite binds the click handler to
 * the trigger element by id, so each instance gets a unique, stable id.
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
  const triggerId = `eventbrite-modal-trigger-${eventId}-${reactId}`;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const boundRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const bindWidget = useCallback(() => {
    if (boundRef.current) return;
    if (typeof window === "undefined" || !window.EBWidgets) return;
    const button = buttonRef.current;
    if (!button) return;
    // React can leave the server-rendered id on the node after a hydration
    // mismatch, so the useId in this closure may not match the id actually
    // in the DOM. Pin the id to the node we hold a ref to, then bind to that
    // exact id — otherwise createWidget finds no trigger and silently no-ops.
    button.id = triggerId;
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      modal: true,
      modalTriggerElementId: triggerId,
      themeSettings: THEME_SETTINGS,
      onOrderComplete: () => {
        // Conversion hook via the app's GTM container (@next/third-parties),
        // so Facebook Pixel "Lead" and CRM tagging can fire downstream.
        sendGTMEvent({ event: "eventbrite_order_complete", eventId });
      },
    });
    boundRef.current = true;
  }, [eventId, triggerId]);

  // The script may already be present after a client-side navigation back.
  useEffect(() => {
    if (typeof window !== "undefined" && window.EBWidgets)
      setScriptLoaded(true);
  }, []);

  useEffect(() => {
    if (scriptLoaded) bindWidget();
  }, [scriptLoaded, bindWidget]);

  return (
    <>
      <Script
        src={EVENTBRITE_WIDGET_SRC}
        strategy="afterInteractive"
        // next/script dedupes by src, so with many buttons only one instance
        // actually loads it. onReady (unlike onLoad) fires for every instance
        // once the shared script is ready, so no card is left unbound.
        onReady={() => setScriptLoaded(true)}
      />
      <RippleButton
        ref={buttonRef}
        id={triggerId}
        type="button"
        variant={variant}
        className={className}
        textTinaField={textTinaField}
      >
        {children}
      </RippleButton>
    </>
  );
};
