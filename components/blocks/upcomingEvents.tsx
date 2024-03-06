import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";

import { formatEventDate, formatRelativeEventDate } from "../../helpers/dates";
import { EventInfo } from "../../services/server/events";
import { CustomLink } from "../customLink";
import { EventsRelativeBox } from "../events/eventsRelativeBox";

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

      setEvents(res.data);
    };

    fetchEvents();
  }, [data.numberOfEvents]);

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
          {loading ? (
            <p>Loading...</p>
          ) : (
            events.map((event, index) => (
              <UpcomingEvent event={event} key={index} />
            ))
          )}
        </div>
        <div className="mt-3 flex flex-row-reverse justify-center sm:justify-start">
          <CustomLink
            href="/events?tech=all&type=all"
            className="unstyled rounded bg-sswRed px-3 py-2 text-xs font-normal text-white hover:bg-sswDarkRed"
          >
            See more events
          </CustomLink>
        </div>
      </div>
    </div>
  );
};

type UpcomingEventProps = {
  event: EventInfo;
};

const UpcomingEvent = ({ event }: UpcomingEventProps) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const [relativeDate, setRelativeDate] = useState<string>("");
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setRelativeDate(
        formatRelativeEventDate(event.StartDateTime, event.EndDateTime)
      );
      setFormattedDate(formatEventDate(event.StartDateTime, event.EndDateTime));
    }
  }, [event.StartDateTime, event.EndDateTime]);

  return (
    <CustomLink
      href={event.Url.Url}
      className="unstyled no-underline"
      key={event.id}
    >
      <article className="my-2.5 grid grid-cols-4 rounded border-1 border-gray-300 bg-white p-2 shadow hover:border-ssw-black dark:border-gray-700 dark:bg-gray-800">
        <div className="col-span-3 justify-center px-3">
          <h2 className="m-0 py-1 text-sm font-bold text-black">
            {event.Title}
          </h2>
          <EventsRelativeBox
            relativeDate={relativeDate}
            formattedDate={formattedDate}
            dateFontSize="text-xs"
          />
          {!!event.Presenter && (
            <span className="mt-1 inline-flex items-center text-xs text-black">
              {event.Presenter}
            </span>
          )}
        </div>
        {!imageFailed && (
          <div className="col-span-1 flex items-center justify-center sm:mr-2 sm:justify-end">
            <Image
              className={"rounded-md"}
              src={event.Thumbnail.Url}
              alt={`${event.Title} logo`}
              width={90}
              height={90}
              onError={() => setImageFailed(true)}
            />
          </div>
        )}
      </article>
    </CustomLink>
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
