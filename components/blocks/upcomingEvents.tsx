import axios from "axios";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

import {
  EventStatus,
  formatEventDate,
  formatRelativeEventDate,
} from "../../helpers/dates";
import { EventInfo } from "../../services/server/events";

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
          b.FormattedDate = formatEventDate(b.StartDateTime, b.EndDateTime);
          b.RelativeDate = formatRelativeEventDate(
            b.StartDateTime,
            b.EndDateTime
          );
        });

      setEvents(res.data);
    };

    fetchEvents();
  }, []);

  return (
    <div className="prose mt-5 max-w-none sm:my-0 ">
      <h2
        data-tina-field={tinaField(data, upcomingEventsBlock.title)}
        className="pb-1.5 text-3xl/9 font-normal text-black"
      >
        {data.title}
      </h2>
      <div className="not-prose">
        <div className="grow">
          {loading ? <p>Loading...</p> : events.map(renderEvent)}
        </div>
        <div className="mt-3 flex flex-row-reverse justify-center sm:justify-start">
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
    <Link
      href={e.Url.Url}
      className="unstyled no-underline"
      target={isExternalLink ? "_blank" : "_self"}
      key={e.id}
    >
      <article className="my-2.5 grid grid-cols-4 rounded border-1 border-gray-300 bg-white p-2 shadow hover:border-sswBlack dark:border-gray-700 dark:bg-gray-800">
        <div className="col-span-3 justify-center px-3">
          <h2 className="m-0 py-1 text-sm font-bold text-black">{e.Title}</h2>
          <time className="my-1 flex items-center">
            {e.RelativeDate && (
              <span
                className={classNames(
                  "inline-flex items-center rounded-sm px-1.5 py-0.5 text-xxs uppercase",
                  e.RelativeDate == EventStatus.NOW_RUNNING ||
                    e.RelativeDate == EventStatus.TODAY // Now running for the two days events and today is for the single day
                    ? "bg-sswRed text-white"
                    : "bg-gray-25 text-black"
                )}
              >
                {e.RelativeDate}
              </span>
            )}
            <span
              className={classNames(
                "text-xxs text-gray-500",
                e.RelativeDate ? "ml-2" : ""
              )}
            >
              {e.FormattedDate}
            </span>
          </time>
          {!!e.Presenter && (
            <span className="mt-1 inline-flex items-center text-xxs text-black">
              {e.Presenter}
            </span>
          )}
        </div>
        <div className="col-span-1 flex items-center justify-center sm:mr-2 sm:justify-end">
          <Image
            className={"rounded-md"}
            src={e.Thumbnail.Url}
            alt={`${e.Title} logo`}
            width={90}
            height={90}
          />
        </div>
      </article>
    </Link>
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
