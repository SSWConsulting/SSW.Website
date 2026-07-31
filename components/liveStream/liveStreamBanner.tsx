"use client";

import { EventInfo } from "@/services/server/events-types";
import classNames from "classnames";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import countdownTextFormat from "../../helpers/countdownTextFormat";
import { CITY_TIMEZONES } from "../util/constants/country";
import { CustomLink } from "../customLink";

dayjs.extend(utc);
dayjs.extend(timezone);

type LiveStreamBannerProps = {
  liveStreamData: EventInfo;
  isLive?: boolean;
  countdownMins: number;
};

const LiveStreamBanner = ({
  liveStreamData,
  isLive,
  countdownMins,
}: LiveStreamBannerProps) => {
  const { title, liveStreamDelayMinutes, city } = liveStreamData;

  const { startDateTime } = liveStreamData;
  const [countdownText, setCountdownText] = useState("");

  // The streamed chapter drives the timezone and label — not a fixed city.
  // Reading it from event data (not the runtime clock/zone) keeps the rendered
  // text deterministic across the cached server render and the live client.
  const cityKey = city?.toLowerCase().replace(/[-\s]/g, "_");
  const timeZone =
    (cityKey && CITY_TIMEZONES[cityKey as keyof typeof CITY_TIMEZONES]) ||
    "Australia/Sydney";
  const cityLabel = city
    ? city
        .replace(/[-_]/g, " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Sydney";

  const scheduledTimeText = (startDateTime: dayjs.Dayjs) => {
    const doorsTime = startDateTime.tz(timeZone);
    const streamTime = startDateTime
      .add(liveStreamDelayMinutes, "minute")
      .tz(timeZone);
    return `Live stream starts at ${streamTime.format(
      "h:mm a"
    )} ${cityLabel}, doors open at ${doorsTime.format(
      "h:mm a"
    )} ${cityLabel}. ${doorsTime.format("Do MMM YYYY ")} #NetUG`;
  };

  useEffect(() => {
    // Only surface a countdown for a genuinely upcoming stream. Once it reaches
    // zero the parent flips to "live"; a value at/below zero while not live
    // means the stream has finished, so never render it as a fake countdown.
    if (countdownMins != null && countdownMins > 0) {
      setCountdownText(`Airing in ${countdownTextFormat(countdownMins)}. `);
    } else {
      setCountdownText("");
    }
  }, [liveStreamData, countdownMins]);

  const hasFinished = !isLive && countdownMins != null && countdownMins <= 0;

  const liveText = "Streaming live now.";
  const statusText = isLive
    ? liveText
    : hasFinished
      ? "Streaming has finished."
      : countdownText || "Calculating...";

  return (
    <div className="w-full bg-ssw-black">
      <CustomLink className="unstyled" href="/live">
        <div
          className={classNames(
            "mx-auto max-w-9xl bg-ssw-black bg-right-top bg-no-repeat px-4 py-1 uppercase sm:px-8",
            isLive ? "md:bg-live-banner-live" : "md:bg-live-banner-wait"
          )}
        >
          <h1 className="m-0 py-0 text-xl font-light text-gray-300">{title}</h1>
          <p className="py-0 text-xs text-white">
            <span className="block text-sswRed">{statusText}</span>
            {!isLive && !hasFinished && scheduledTimeText(dayjs(startDateTime))}
          </p>
        </div>
      </CustomLink>
    </div>
  );
};

export default LiveStreamBanner;
