"use client";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";

import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";

import { PropsWithChildren, useEffect, useState } from "react";
import { EventInfo } from "../../services/server/events";

dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const LiveStreamWidget = dynamic(
  () => {
    return import("./liveStreamWidget").then((mod) => mod.LiveStreamWidget);
  },
  {
    loading: () => <></>,
    ssr: true,
  }
);

const LiveStreamBanner = dynamic(
  () => {
    return import("@/components/liveStream/liveStreamBanner").then(
      (mod) => mod.LiveStreamBanner
    );
  },
  {
    loading: () => <></>,
    ssr: true,
  }
);

const INTERVAL_MINUTES = 1;

interface LiveStreamProps extends PropsWithChildren {
  event: EventInfo;
}

export function LiveSteam({ event, children }: LiveStreamProps) {
  const [countdownMins, setCountdownMins] = useState<number>();
  const [liveStreamDelayMinutes, setLiveStreamDelayMinutes] = useState(0);

  useEffect(() => {
    if (!event?.StartDateTime || !event?.EndDateTime) {
      return;
    }

    const rightnow = dayjs()?.utc();

    const liveDelay = event.SSW_LiveStreamDelayMinutes ?? 0;
    if (!liveStreamDelayMinutes && event.SSW_DelayedLiveStreamStart) {
      setLiveStreamDelayMinutes(liveDelay);
    }

    const start = dayjs(event.StartDateTime).add(liveDelay, "minute");
    const minsToStart = start.diff(rightnow, "minute");
    setCountdownMins(minsToStart);

    const timer = setInterval(
      () => {
        setCountdownMins((countdownMins) => {
          if (!countdownMins) return minsToStart;
          return countdownMins - INTERVAL_MINUTES;
        });
      },
      INTERVAL_MINUTES * 60 * 1000
    );

    return () => clearInterval(timer);
  }, [event, liveStreamDelayMinutes]);

  const rightnow = dayjs().utc();

  const isLive = true;
  countdownMins &&
    countdownMins <= 0 &&
    !!event &&
    rightnow.isBefore(event?.EndDateTime);

  const showBanner = true;
  !!event &&
    dayjs().isBetween(
      dayjs(event.StartShowBannerDateTime),
      dayjs(event.EndShowBannerDateTime),
      null,
      "[)"
    );

  return (
    <>
      {showBanner && (
        <LiveStreamBanner
          {...{ countdownMins, liveStreamDelayMinutes, isLive, event }}
          isLive={!!isLive}
        />
      )}
      <div className="mx-auto max-w-9xl px-8">
        {isLive && (
          <LiveStreamWidget
            {...{ event, liveStreamDelayMinutes }}
            isLive={!!isLive}
          />
        )}
        {children}
      </div>
    </>
  );
}
