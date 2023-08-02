import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

import axios from "axios";
import { EventInfo, LiveStreamBannerInfo } from "../../services/server/events";

const EventStatus = {
  TODAY: "today",
  NOW_RUNNING: "now running",
};

EventStatus;

export const UpcomingEvents = ({ data }) => {
  const [events, setEvents] = useState<EventInfo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const res = await axios.get<EventInfo[]>("/api/get-upcoming-events", {
        params: { top: data.numberOfEvents },
      });
      setLoading(false);

      if (res?.status !== 200 || !res.data.length) return;

      !!res.data &&
        Array.isArray(res.data) &&
        res.data.forEach((b) => {
          b.FormattedDate = formatBannerDate(b);
          b.RelativeDate = formatRelativeBannerDate(b);
        });

      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="prose max-w-none">
      <h1
        data-tina-field={tinaField(data, upcomingEventsBlock.title)}
        className="pb-5 font-light"
      >
        {data.title}
      </h1>
      <div className="not-prose">
        <div className="max-h-150 grow">
          {loading ? <p>Loading...</p> : events.map(renderEvent)}
        </div>
        <div className="mt-3 flex flex-row-reverse">
          {/* TODO: Update link after implement this page */}
          <Link
            href="https://www.ssw.com.au/ssw/Events/?tech=all&type=all"
            className="unstyled rounded bg-sswRed px-3 py-2 text-xs font-normal text-white hover:bg-sswDarkRed"
          >
            See more events
          </Link>
        </div>
      </div>
    </div>
  );
};

const renderEvent = (e: EventInfo) => {
  const isExternalLink =
    !e.Url.Url.includes("ssw.com.au") || e.Url.Url.includes("/ssw/redirect");

  return (
    <>
      <article
        key={e.id}
        className="my-2.5 grid grid-cols-4 rounded border-1 border-gray-300 bg-white p-2 shadow dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="col-span-3 justify-center px-3">
          <h2 className="m-0 py-1 text-sm">
            <Link
              href={e.Url.Url}
              className="unstyled text-sm font-bold text-black"
              target={isExternalLink ? "_blank" : "_self"}
            >
              {e.Title}
            </Link>
          </h2>
          <time className="my-1 flex">
            <span
              className={classNames(
                "inline-flex items-center rounded-sm px-1.5 py-0.5 text-xxs uppercase",
                e.RelativeDate == EventStatus.NOW_RUNNING ||
                  e.RelativeDate == EventStatus.TODAY // Now running for the two days events and today is for the single day
                  ? "bg-green-400 text-black"
                  : "bg-sswRed text-white"
              )}
            >
              {e.RelativeDate}
            </span>
            <span className="ml-2 text-xxs text-gray-500">
              {e.FormattedDate}
            </span>
          </time>
          {!!e.Presenter && (
            <span className="mt-1 inline-flex items-center text-xxs text-black">
              {e.Presenter}
            </span>
          )}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          <Link href={e.Thumbnail.Url}>
            <Image
              className={"rounded-md"}
              src={e.Thumbnail.Url}
              alt={`${e.Title} logo`}
              width={90}
              height={90}
            />
          </Link>
        </div>
      </article>
    </>
  );
};

export const upcomingEventsBlock = {
  title: "title",
};

export const upcomingEventsBlockSchema: Template = {
  name: "UpcomingEvents",
  label: "Upcoming Events",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      title: "Upcoming Events",
      numberOfEvents: 30,
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "number",
      label: "Number of Events",
      name: "numberOfEvents",
    },
  ],
};

const formatBannerDate = (bannerInfo: LiveStreamBannerInfo) => {
  if (!bannerInfo.StartDateTime || !bannerInfo.EndDateTime) return "";

  // NOTE: Omit ddd for brevity if it's next year's event
  const dateformat =
    dayjs(bannerInfo.StartDateTime).year() === dayjs().year()
      ? "MMM D"
      : "MMM D YYYY";

  const isOneDayEvent = dayjs(bannerInfo.StartDateTime)
    .startOf("day")
    .isSame(dayjs(bannerInfo.EndDateTime).startOf("day"));
  const startDate = dayjs(bannerInfo.StartDateTime).format(dateformat);
  const endDate = dayjs(bannerInfo.EndDateTime).format(dateformat);

  return isOneDayEvent ? startDate : `${startDate} - ${endDate}`;
};

const formatRelativeBannerDate = (bannerInfo: LiveStreamBannerInfo) => {
  const now = dayjs();
  const start = dayjs(bannerInfo.StartDateTime);
  const end = dayjs(bannerInfo.EndDateTime);

  if (now.isBetween(start, end)) {
    return EventStatus.NOW_RUNNING;
  }

  const isSameDay = now.startOf("day").isSame(start.startOf("day"));

  const days = start.diff(now, "d");
  if (days === 0 && isSameDay) {
    return EventStatus.TODAY;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} to go`;
  } else {
    return "";
  }
};
