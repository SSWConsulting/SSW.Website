import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import timezone from "dayjs/plugin/timezone";
import classNames from "classnames";
import { Event } from "../classes/event";

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

  const [countdownMins, setCountdownMins] = useState(0);
  const [countdownText, setCountdownText] = useState("AA");

  useEffect(() => {
    const fetchEvent = async () => {
      const datetime = dayjs.utc().format("YYYY-MM-DDTHH:mm:ss[Z]"); //Why

      const params = {
        odataFilter: encodeURIComponent(
          `$filter=Enabled ne false and EndDateTime gt datetime'${datetime}'`
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
      setEvent(event);

      const startDateTime = dayjs(event.StartDateTime);

      const isNow = dayjs(datetime).isBetween(
        startDateTime,
        dayjs(event.EndDateTime)
      );
      setIsLive(isNow);

      return startDateTime;
    };

    fetchEvent().then(() => {
      const startDateTime = dayjs(event.StartDateTime);
      setCountdownMins(startDateTime.diff(dayjs(), "minute"));
    }); 

    const interval = setInterval(() => {
      setCountdownMins(countdownMins => countdownMins - 1);
      console.log("test");
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setCountdownText(countdownTimeText(countdownMins));
    console.log(countdownMins);
  }, [countdownMins])

  if (event.StartDateTime === undefined) return <></>;

  const startDateTime = dayjs(event.StartDateTime);
  const isSameDay = startDateTime.isSame(dayjs(), "day");

  if (isSameDay) {
    const liveText = "Streaming live now.";
    return (
      <div className="w-full bg-gray-900">
      <a href="https://ssw.com.au/live">
        
        <div
          className={classNames(
            "h-liveStream bg-gray-900 bg-right-top bg-no-repeat p-5 uppercase mx-auto max-w-7xl px-6 sm:px-8",
            isLive ? "bg-live-banner-live" : "bg-live-banner-wait"
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

function countdownTimeText(countdownMins:number) {
  const hours = Math.floor(countdownMins / 60);
  const minutes = countdownMins % 60;

  let countdownText = "";
  
  if (hours > 1) {
    countdownText = countdownText.concat(`${hours} hours`)
  } else if (hours == 1) {
    countdownText = countdownText.concat(`${hours} hour`)
  }

  if (hours > 0 && minutes > 0) {
    countdownText = countdownText.concat(" and ")
  }

  if (minutes > 1) {
    countdownText = countdownText.concat(`${minutes} minutes`)
  } else if (minutes === 1) {
    countdownText = countdownText.concat(`${minutes} minute`)
  } 

  return `Airing in ${countdownText}. `;
}

function scheduledTimeText(startDateTime: dayjs.Dayjs) {
  const sydStartTime = startDateTime.tz("Australia/Sydney").format("h a");
  return `${sydStartTime} Sydney, ${startDateTime.format("Do MMM YYYY ")}`;
}
