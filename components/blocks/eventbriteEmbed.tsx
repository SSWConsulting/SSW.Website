"use client";

import Script from "next/script";
import React, { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

const EVENTBRITE_WIDGET_SRC =
  "https://www.eventbrite.com/static/widgets/eb_widgets.js";

declare global {
  interface Window {
    EBWidgets?: {
      createWidget: (options: {
        widgetType: "checkout";
        eventId: string;
        iframeContainerId: string;
        iframeContainerHeight?: number;
      }) => void;
    };
  }
}

export interface EventbriteEmbedProps {
  data: {
    eventId?: string;
    iframeHeight?: number;
    fallbackUrl?: string;
    containerClass?: string;
  };
}

export const EventbriteEmbed: React.FC<EventbriteEmbedProps> = ({ data }) => {
  const { eventId, iframeHeight, fallbackUrl, containerClass } = data ?? {};
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerId = eventId
    ? `eventbrite-widget-container-${eventId}`
    : undefined;

  const createWidget = useCallback(() => {
    if (!eventId || !containerId) return;
    if (typeof window === "undefined" || !window.EBWidgets) return;
    window.EBWidgets.createWidget({
      widgetType: "checkout",
      eventId,
      iframeContainerId: containerId,
      iframeContainerHeight: iframeHeight || 650,
    });
  }, [eventId, containerId, iframeHeight]);

  // Handle the case where the widget script is already on the page
  // (e.g. after a client-side navigation back to this route).
  useEffect(() => {
    if (typeof window !== "undefined" && window.EBWidgets) {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (scriptLoaded) createWidget();
  }, [scriptLoaded, createWidget]);

  // No event configured yet — show an editor-facing placeholder rather than
  // an empty container. Lets the booking page ship before the Eventbrite
  // event exists.
  if (!eventId) {
    return (
      <div
        data-tina-field={data && tinaField(data, "eventId")}
        className={twMerge(
          "mx-auto flex min-h-64 w-full max-w-3xl items-center justify-center rounded-lg border border-dashed border-gray-400 p-8 text-center text-gray-500",
          containerClass
        )}
      >
        Add an Eventbrite Event ID in Tina to embed the booking widget.
      </div>
    );
  }

  return (
    <>
      <Script
        src={EVENTBRITE_WIDGET_SRC}
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div
        data-tina-field={data && tinaField(data, "eventId")}
        className={twMerge("mx-auto w-full max-w-3xl", containerClass)}
      >
        <div id={containerId} />
        {fallbackUrl && (
          <noscript>
            <a href={fallbackUrl}>Book tickets on Eventbrite</a>
          </noscript>
        )}
      </div>
    </>
  );
};

export const eventbriteEmbedSchema: Template = {
  name: "EventbriteEmbed",
  label: "Eventbrite Embed",
  ui: {
    itemProps: (item) => ({
      label: item?.eventId
        ? `Eventbrite Embed (${item.eventId})`
        : "Eventbrite Embed (no event id)",
    }),
  },
  fields: [
    {
      type: "string",
      name: "eventId",
      label: "Eventbrite Event ID",
      description:
        "Numeric event ID from the Eventbrite event URL, e.g. eventbrite.com/e/<name>-<EVENT_ID>. Leave blank to show a placeholder.",
    },
    {
      type: "number",
      name: "iframeHeight",
      label: "Embed Height (px)",
      description: "Height of the embedded checkout. Defaults to 650.",
    },
    {
      type: "string",
      name: "fallbackUrl",
      label: "Fallback Eventbrite URL",
      description:
        "Full Eventbrite event URL — used as a no-JS fallback link below the embed.",
    },
    {
      type: "string",
      name: "containerClass",
      label: "Container Class",
    },
  ],
};
