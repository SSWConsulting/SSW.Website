import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { EventInfo } from "../services/server/events-types";

export type LiveStreamProps = {
  countdownMins?: number;
  liveStreamDelayMinutes: number;
};

const INTERVAL_MINUTES = 1;

export function useLiveStreamTimer(event: EventInfo): LiveStreamProps {
  const [countdownMins, setCountdownMins] = useState<number>();
  const [liveStreamDelayMinutes, setLiveStreamDelayMinutes] = useState(0);

  useEffect(() => {
    const rightnow = dayjs().utc();
    const liveDelay = event?.liveStreamDelayMinutes ?? 0;
    if (!liveStreamDelayMinutes && event?.delayedLiveStreamStart) {
      setLiveStreamDelayMinutes(liveDelay);
    }

    const start = dayjs(event?.startDateTime).add(liveDelay, "minute");
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

  return {
    countdownMins,
    liveStreamDelayMinutes,
  };
}
