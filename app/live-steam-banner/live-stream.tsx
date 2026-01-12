"use client";

import { MenuWrapper } from "app/components/MenuWrapper";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import dynamic from "next/dynamic";

import {
  EventInfo,
  EventInfoStatic,
  formatDates,
} from "@/services/server/events-types";
import { PropsWithChildren, useEffect, useState } from "react";
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(isBetween);

const LiveStreamClient = dynamic(
  () => {
    return import("./live-stream-client").then((mod) => mod.LiveStreamClient);
  },
  {
    loading: () => <></>,
    ssr: false,
  }
);

const LiveStreamWidget = dynamic(
  () => {
    return import("./liveStreamWidget").then((mod) => mod.LiveStreamWidget);
  },
  {
    loading: () => <></>,
    ssr: true,
  }
);

import LiveStreamBanner from "@/components/liveStream/liveStreamBanner";

const INTERVAL_MINUTES = 1;

interface LiveStreamProps extends PropsWithChildren {
  event: EventInfoStatic;
}

export function LiveStream({ event, children }: LiveStreamProps) {
  const [countdownMins, setCountdownMins] = useState<number>();
  const [liveStreamDelayMinutes, setLiveStreamDelayMinutes] = useState(0);

  const eventDynamic: EventInfo = {
    ...event,
    ...formatDates(event),
  };

  useEffect(() => {
    if (!event?.startDateTime || !event?.endDateTime) {
      return;
    }

    const rightnow = dayjs()?.utc();

    const liveDelay = event.liveStreamDelayMinutes ?? 0;
    if (!liveStreamDelayMinutes && event.delayedLiveStreamStart) {
      setLiveStreamDelayMinutes(liveDelay);
    }

    const start = dayjs(event.startDateTime).add(liveDelay, "minute");
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

  const isLive =
    countdownMins &&
    countdownMins <= 0 &&
    !!event &&
    rightnow.isBefore(event?.endDateTime);

  const showBanner =
    !!event &&
    dayjs().isBetween(
      dayjs(event.startShowBannerDateTime),
      dayjs(event.endShowBannerDateTime),
      null,
      "[)"
    );

  return (
    <>
      {showBanner ? (
        <LiveStreamBanner
          countdownMins={countdownMins}
          liveStreamData={eventDynamic}
          isLive={!!isLive}
        />
      ) : (
        <LiveStreamClient param={"liveBanner"}>
          {" "}
          <LiveStreamBanner
            countdownMins={countdownMins}
            liveStreamData={eventDynamic}
            isLive={!!isLive}
          />
        </LiveStreamClient>
      )}

      <MenuWrapper>
        {isLive ? (
          <LiveStreamWidget
            {...{ eventDynamic, liveStreamDelayMinutes }}
            event={eventDynamic}
            isLive={!!isLive}
          />
        ) : (
          <LiveStreamClient param={"liveStream"}>
            <LiveStreamWidget
              {...{ eventDynamic, liveStreamDelayMinutes }}
              event={eventDynamic}
              isLive={!!isLive}
            />
          </LiveStreamClient>
        )}
        {children}
      </MenuWrapper>
    </>
  );
}
