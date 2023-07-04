import classNames from "classnames";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import countdownTextFormat from "../../helpers/countdownTextFormat";
import { LiveStreamProps } from "./useLiveStreamProps";

export const LiveStreamBanner: FC<LiveStreamProps> = ({
  countdownMins,
  liveStreamDelayMinutes,
  isLive,
  event,
}) => {
  const router = useRouter();
  const [countdownText, setCountdownText] = useState("");
  const [showBanner, setShowBanner] = useState<boolean>();

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

    setShowBanner(
      !!event &&
        (!!router.query.liveBanner ||
          dayjs().isBetween(
            dayjs(event.StartShowBannerDateTime),
            dayjs(event.EndShowBannerDateTime),
            null,
            "[)"
          ))
    );
  }, [countdownMins, event]);

  if (!event?.StartDateTime || !showBanner) {
    return <></>;
  }

  const liveText = "Streaming live now.";
  return (
    <div className="w-full bg-gray-900">
      <Link className="unstyled" href="/live">
        <div
          className={classNames(
            "mx-auto max-w-9xl bg-gray-900 bg-right-top bg-no-repeat px-6 py-1 uppercase sm:px-8",
            isLive ? "md:bg-live-banner-live" : "md:bg-live-banner-wait"
          )}
        >
          <h1 className="m-0 py-0 text-xl font-light text-gray-300">
            {event.Title}
          </h1>
          <p className="py-0 text-xs text-white">
            <span className="block text-sswRed">
              {isLive ? liveText : countdownText}
            </span>
            {!isLive && scheduledTimeText(dayjs(event.StartDateTime))}
          </p>
        </div>
      </Link>
    </div>
  );
};
