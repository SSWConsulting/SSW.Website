"use client";

import { EventInfo } from "@/services/server/events-types";
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import countdownTextFormat from "../../helpers/countdownTextFormat";
import { CustomLink } from "../customLink";

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
  const { title, liveStreamDelayMinutes } = liveStreamData;

  const { startDateTime } = liveStreamData;
  const [countdownText, setCountdownText] = useState("");

  const scheduledTimeText = (startDateTime: dayjs.Dayjs) => {
    const sydStartTime = startDateTime.tz("Australia/Sydney").format("h:mm a");
    const sydLiveTime = startDateTime
      .add(liveStreamDelayMinutes, "minute")
      .tz("Australia/Sydney")
      .format("h:mm a");
    return `Live stream starts at ${sydLiveTime} Sydney, doors open at ${sydStartTime} Sydney. ${startDateTime.format(
      "Do MMM YYYY "
    )} #NetUG`;
  };

  useEffect(() => {
    const formattedCountdown = countdownTextFormat(countdownMins);
    setCountdownText(`Airing in ${formattedCountdown}. `);
  }, [liveStreamData, countdownMins]);

  const liveText = "Streaming live now.";
  return (
    <div className="w-full bg-ssw-black">
      <CustomLink className="unstyled" href="/live">
        <div
          className={classNames(
            "mx-auto max-w-9xl bg-ssw-black bg-right-top bg-no-repeat px-6 py-1 uppercase sm:px-8",
            isLive ? "md:bg-live-banner-live" : "md:bg-live-banner-wait"
          )}
        >
          <h1 className="m-0 py-0 text-xl font-light text-gray-300">{title}</h1>
          <p className="py-0 text-xs text-white">
            <span className="block text-sswRed">
              {(isLive ? liveText : countdownText) || "Calculating..."}
            </span>
            {!isLive && scheduledTimeText(dayjs(startDateTime))}
          </p>
        </div>
      </CustomLink>
    </div>
  );
};

export default LiveStreamBanner;
