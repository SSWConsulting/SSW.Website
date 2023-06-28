import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { EventInfo } from "../../services/server/events";

export type LiveStreamProps = {
  countdownMins: number;
  liveStreamDelayMinutes: number;
  isLive: boolean;
  event?: EventInfo;
};

const INTERVAL_MINUTES = 1;

export function useLiveStreamProps(): LiveStreamProps {
  const [countdownMins, setCountdownMins] = useState<number>();
  const [event, setEvent] = useState<EventInfo>();
  const [isLive, setIsLive] = useState(false);
  const [liveStreamDelayMinutes, setLiveStreamDelayMinutes] = useState(0);

  useEffect(() => {
    const rightnow = dayjs().utc();

    const fetchEvent = async () => {
      const res = await axios.get<EventInfo[]>("/api/get-livestream-banner", {
        params: { datetime: rightnow.toISOString() },
      });

      if (res?.status !== 200 || !res?.data?.length) {
        setIsLive(false);
        setEvent(undefined);

        return;
      }

      setEvent(res.data[0]);

      setIsLive(
        countdownMins <= 0 && !!event && rightnow.isBefore(event?.EndDateTime)
      );
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    if (!event?.StartDateTime || !event?.EndDateTime) {
      return;
    }

    const rightnow = dayjs().utc();

    const liveDelay = event.SSW_LiveStreamDelayMinutes ?? 0;
    if (!liveStreamDelayMinutes && event.SSW_DelayedLiveStreamStart) {
      setLiveStreamDelayMinutes(liveDelay);
    }

    const start = dayjs(event.StartDateTime).add(liveDelay, "minute");
    const minsToStart = start.diff(rightnow, "minute");
    setCountdownMins(minsToStart);

    const timer = setInterval(() => {
      setCountdownMins((countdownMins) => {
        if (!countdownMins) return minsToStart;
        return countdownMins - INTERVAL_MINUTES;
      });
    }, INTERVAL_MINUTES * 60 * 1000);

    return () => clearInterval(timer);
  }, [event]);

  return {
    countdownMins,
    liveStreamDelayMinutes,
    event,
    isLive,
  };
}
