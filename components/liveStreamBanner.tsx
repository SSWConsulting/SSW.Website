import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import classNames from "classnames";
import { Event } from "../classes/event";

import countdownTextFormat from "../helpers/countdownTextFormat";

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
  const router = useRouter();
  const [isLive, setIsLive] = useState(false);

  const [countdownMins, setCountdownMins] = useState(0);
  const [countdownText, setCountdownText] = useState("");

  const [startDateTime, setStartDateTime] = useState(undefined);

  useEffect(() => {
    const fetchEvent = async () => {
      const datetime = dayjs.utc().format("YYYY-MM-DDTHH:mm:ss[Z]"); //Why

      const params = {
        odataFilter: encodeURIComponent(
          `$filter=Enabled ne false and EndDateTime gt datetime'${datetime}' and CalendarType eq 'User Groups'`
        ),
        $top: 1,
        // TODO: Doesn't work
        $orderby: encodeURIComponent("StartDateTime desc"),
      };

      const res = await axios.get(
        "https://www.ssw.com.au/ssw/SharePointEventsService.aspx",
        { params }
      );

      if (res?.status !== 200) return;

      const event = res?.data
        .map((e) => new Event(e))
        .sort((a, z) => a.StartDateTime - z.StartDateTime)[0];
      await setEvent(event);

      const start = await dayjs(event.StartDateTime)
      await setStartDateTime(start);
      await setCountdownMins(start.diff(dayjs(), "minute"));
      
      const isNow = dayjs(datetime).isBetween(
        start,
        dayjs(event.EndDateTime)
      );

      setIsLive(isNow);
    };

    fetchEvent();

    const interval = setInterval(() => {
      if (countdownMins >= -1) {
        setCountdownMins(countdownMins => countdownMins - 1);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const formattedCountdown = countdownTextFormat(countdownMins);
    setCountdownText(`Airing in ${formattedCountdown}. `);
    setIsLive(countdownMins <= 0);
  }, [countdownMins])

  if (startDateTime === undefined) return <></>;

  const isSameDay = router.query.liveBanner || startDateTime.isSame(dayjs(), "day");

  if (isSameDay) {
    const liveText = "Streaming live now.";
    return (
      <div className="w-full bg-gray-900">
      <a className="unstyled" href="https://ssw.com.au/live">
        
        <div
          className={classNames(
            "bg-gray-900 bg-right-top bg-no-repeat p-5 uppercase mx-auto max-w-9xl px-6 sm:px-8",
            isLive ? "md:bg-live-banner-live" : "md:bg-live-banner-wait"
          )}
        >
          <h1 className="m-0 py-0 text-xl font-light text-gray-300">{event.Title}</h1>
          <p className="py-0 text-xs text-white">
            <span className="text-sswRed">
              {isLive ? liveText : countdownText}
            </span>
            {!isLive && scheduledTimeText(startDateTime)} #NetUG
          </p>
        </div>
      </a>
      </div>
    );
  } else {
    return <></>;
  }
};

function scheduledTimeText(startDateTime: dayjs.Dayjs) {
  const sydStartTime = startDateTime.tz("Australia/Sydney").format("h a");
  return `${sydStartTime} Sydney, ${startDateTime.format("Do MMM YYYY ")}`;
}
