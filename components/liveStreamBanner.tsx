import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import classNames from "classnames";
import { getLiveStreamBannerInfo } from "../services";

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);
dayjs.extend(timezone);

export const LiveStreamBanner = () => {
  const [event, setEvent] = useState({
    Title: null,
    StartDateTime: null,
  });
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const datetime = dayjs.utc();
      const res = await getLiveStreamBannerInfo(datetime);

      if (res?.status !== 200 || !res.data.length) return;

      const latestEvent = res.data[0];
      setEvent(latestEvent);

      const startDateTime = dayjs(event.StartDateTime);

      const isNow = dayjs(datetime).isBetween(
        startDateTime,
        dayjs(latestEvent.EndDateTime)
      );
      setIsLive(isNow);
    };

    fetchEvent();
  }, []);

  if (!event?.StartDateTime) return <></>;

  const startDateTime = dayjs(event.StartDateTime);
  const isSameDay = startDateTime.isSame(dayjs(), "day");

  if (isSameDay) {
    const liveText = "Streaming live now.";
    const countdownText = `Airing ${startDateTime.fromNow()}. `;
    return (
      <a href="https://ssw.com.au/live">
        <div
          className={classNames(
            "h-liveStream bg-gray-900 bg-right-top bg-no-repeat p-3 uppercase",
            isLive ? "bg-live-banner-live" : "bg-live-banner-wait"
          )}
        >
          <h1 className="text-xl font-light text-gray-300">{event.Title}</h1>
          <p className=" text-xs text-white">
            <span className="text-sswRed">
              {isLive ? liveText : countdownText}
            </span>
            {!isLive && scheduledTimeText(startDateTime)} #NetUG
          </p>
        </div>
      </a>
    );
  } else {
    return <></>;
  }
};

function scheduledTimeText(startDateTime: dayjs.Dayjs) {
  const sydStartTime = startDateTime.tz("Australia/Sydney").format("h a");
  return `${sydStartTime} Sydney, ${startDateTime.format("Do MMM YYYY ")}`;
}
