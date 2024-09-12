"use client";

import { EventInfoStatic, formatDates } from "@/services/server/events";
import classNames from "classnames";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import countdownTextFormat from "../../helpers/countdownTextFormat";
import { CustomLink } from "../customLink";

type LiveStreamBannerProps = {
  liveStreamData: EventInfoStatic;
};

const LiveStreamBanner = ({ liveStreamData }: LiveStreamBannerProps) => {
  const { delayedLiveStreamStart, title } = liveStreamData;
  const { startDateTime } = formatDates(liveStreamData);
  const [countdownMins, setCountdownMins] = useState<number>();
  const [countdownText, setCountdownText] = useState("");
  const [isLive, setIslive] = useState(true);
  const [liveStreamDelayMinutes, setLiveStreamDelayMinutes] = useState(0);

  const rightnow = dayjs().utc();

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
    console.log("liveStreamData", liveStreamData);
    const formattedCountdown = countdownTextFormat(countdownMins);
    setCountdownText(`Airing in ${formattedCountdown}. `);

    const liveDelay = liveStreamDelayMinutes ?? 0;
    if (!liveStreamDelayMinutes && delayedLiveStreamStart) {
      setLiveStreamDelayMinutes(liveDelay);
    }
    const start = dayjs(startDateTime).add(liveDelay, "minute");

    if (!liveStreamDelayMinutes && delayedLiveStreamStart) {
      setLiveStreamDelayMinutes(liveDelay);
    }

    const minsToStart = start.diff(rightnow, "minute");
    setCountdownMins(minsToStart);
  }, [countdownMins]);

  // if (startDateTime) {
  //   return <></>;
  // }

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
              {isLive ? liveText : countdownText}
            </span>
            {!isLive && scheduledTimeText(dayjs(startDateTime))}
          </p>
        </div>
      </CustomLink>
    </div>
  );
};

// export const getStaticProps = async () => {
//   const nextUG = await client.queries.getFutureEventsQuery({
//     fromDate: new Date().toISOString(),
//     top: 1,
//     calendarType: "User Groups",
//   });
//   const liveStreamData: EventInfo =
//     nextUG.data.eventsCalendarConnection.edges.map((edge) => ({
//       ...edge.node,
//       startDateTime: new Date(edge.node.startDateTime),
//       endDateTime: new Date(edge.node.endDateTime),
//       startShowBannerDateTime: new Date(edge.node.startShowBannerDateTime),
//       endShowBannerDateTime: new Date(edge.node.endShowBannerDateTime),
//     }))[0] ?? null;

//   console.log("liveStreamData", liveStreamData);
//   return {
//     props: {
//       liveStreamData,
//     },
//   };
// };

export default LiveStreamBanner;
