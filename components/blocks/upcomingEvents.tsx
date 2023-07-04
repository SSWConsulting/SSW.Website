import dayjs from "dayjs";
// import relativeTime from "dayjs/plugin/relativeTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

import axios from "axios";
import { EventInfo, LiveStreamBannerInfo } from "../../services/server/events";

export const UpcomingEvents = ({ data }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const datetime = dayjs().startOf("day").utc();

      setLoading(true);
      const res = await axios.get<EventInfo[]>("/api/get-upcoming-events", {
        params: { datetime: datetime.toISOString(), top: data.numberOfEvents },
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
        <div className="max-h-150 grow overflow-x-hidden overflow-y-scroll border-2 bg-gray-100">
          {loading ? <p>Loading...</p> : events.map(renderEvent)}
        </div>
        <div className="mt-3 flex flex-row-reverse">
          {/* TODO: Update link after implement this page */}
          <Link
            href="https://www.ssw.com.au/ssw/Events/?tech=all&type=all"
            className="unstyled inline-flex items-center rounded border-1 border-gray-300 bg-white px-3 py-2 text-xs font-normal leading-4 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            More Events
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
    <article key={e.id} className="flex">
      <div className="flex min-w-fit items-center">
        <Link href={e.Thumbnail.Url}>
          <Image
            src={e.Thumbnail.Url}
            alt={`${e.Title} logo`}
            width={100}
            height={100}
          />
        </Link>
      </div>
      <div className="flex flex-col justify-center px-6">
        <time className="uppercase">
          <span className="text-xs">{e.FormattedDate}</span>
          <span className="ml-2 inline-flex items-center rounded-md bg-gray-700 px-1.5 font-bold text-white">
            {e.RelativeDate}
          </span>
        </time>
        <h2 className="m-0 py-1 text-sm">
          <Link
            href={e.Url.Url}
            className="unstyled text-sm font-bold text-sswRed"
            target={isExternalLink ? "_blank" : "_self"}
          >
            {e.Title}
          </Link>
        </h2>
        {!!e.Presenter && (
          <span className="whitespace-nowrap text-xs">{e.Presenter}</span>
        )}
      </div>
    </article>
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
  if (!bannerInfo.StartDateTime || !bannerInfo.EndDateTime) return null;

  // NOTE: Omit ddd for brevity if it's next year's event
  const dateformat =
    dayjs(bannerInfo.StartDateTime).year() === dayjs().year()
      ? "ddd MMM D"
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
    return "now running";
  }

  const isSameDay = now.startOf("day").isSame(start.startOf("day"));

  const days = start.diff(now, "d");
  if (days === 0 && isSameDay) {
    return "today";
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} to go`;
  } else {
    return "";
  }
};
