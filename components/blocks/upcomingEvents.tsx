import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";

import Image from "next/legacy/image";
import Link from "next/link";
import { EventInfo, getUpcomingEvents } from "../../services";

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export const UpcomingEvents = ({ data }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const datetime = dayjs.utc().startOf("day");

      setLoading(true);
      const res = await getUpcomingEvents(datetime, data.numberOfEvents);
      setLoading(false);

      if (res?.status !== 200 || !res.data.length) return;

      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="prose max-w-none">
      <h1 className="pb-5 font-light">{data.title}</h1>
      <div className="not-prose">
        <div className="max-h-150 grow overflow-x-hidden overflow-y-scroll border-2 bg-gray-100">
          {loading ? <p>Loading...</p> : events.map(renderEvent)}
        </div>
        <div className="mt-3 flex flex-row-reverse">
          {/* TODO: Update link after implement this page */}
          <Link
            href="https://www.ssw.com.au/ssw/Events/?tech=all&type=all"
            className="inline-flex items-center rounded border-1 border-gray-300 bg-white px-3 py-2 text-xs font-normal leading-4 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
    <article key={e.Id} className="flex">
      <figure className="flex min-w-fit items-center">
        <Link href={e.Thumbnail.Url}>
          {/* TODO: refactor with next/image */}
          <Image
            src={e.Thumbnail.Url}
            alt="event logo"
            width={75}
            height={75}
          />
        </Link>
      </figure>
      <div className="ml-5 flex flex-col justify-center">
        <time className="text-xs uppercase">
          <span>{e.FormattedDate}</span>
          <span className="ml-2 inline-flex items-center rounded-md bg-gray-700 px-1.5 text-xs font-bold text-white">
            {e.RelativeDate}
          </span>
        </time>
        <h2 className="m-0 text-sm">
          <Link
            href={e.Url.Url}
            className="text-sm text-sswRed"
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
