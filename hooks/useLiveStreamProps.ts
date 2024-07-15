import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { EventInfo } from "../services/server/events";
import client from "../tina/__generated__/client";

export type LiveStreamProps = {
  countdownMins?: number;
  liveStreamDelayMinutes: number;
  event?: EventInfo;
};

const INTERVAL_MINUTES = 1;

export function useLiveStreamProps(): LiveStreamProps {
  const [countdownMins, setCountdownMins] = useState<number>();
  const [event, setEvent] = useState<EventInfo>();
  const [liveStreamDelayMinutes, setLiveStreamDelayMinutes] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      const nextUG = await client.queries.getFutureEventsQuery({
        fromDate: new Date().toISOString(),
        top: 1,
        calendarType: "User Groups",
      });

      const liveStreamData: EventInfo =
        nextUG.data.eventsCalendarConnection.edges.map((edge) => ({
          ...edge.node,
          startDateTime: new Date(edge.node.startDateTime),
          endDateTime: new Date(edge.node.endDateTime),
          startShowBannerDateTime: new Date(edge.node.startShowBannerDateTime),
          endShowBannerDateTime: new Date(edge.node.endShowBannerDateTime),
        }))[0] ?? null;

      setEvent(liveStreamData);
    };

    fetchEvent();
  }, []);

  useEffect(() => {
    if (!event?.startDateTime || !event?.endDateTime) {
      return;
    }

    const rightnow = dayjs().utc();

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

  return {
    countdownMins,
    liveStreamDelayMinutes,
    event,
  };
}
