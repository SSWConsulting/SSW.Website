"use client";
import { useEffect, useState } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { EventImageClient } from "../../app/components/event-image-client";
import { useFormatDates } from "../../hooks/useFormatDates";
import client from "../../tina/__generated__/client";
import { CustomLink } from "../customLink";
import { EventsRelativeBox } from "../events/eventsRelativeBox";
import { EventTrimmed } from "../filter/events";
import { PresenterList } from "../presenters/presenterList";

const mapEventData = (data) => {
  const events = data.events;

  if (!events) {
    return [];
  }

  const mappedEvents = events.data.eventsCalendarConnection.edges.map(
    (event) => ({
      ...event.node,
      startDateTime: new Date(event.node.startDateTime),
      endDateTime: new Date(event.node.endDateTime),
    })
  );
  return mappedEvents;
};

export const UpcomingEvents = ({ data }) => {
  if (!data.events) {
    return <UpcomingEventsClient data={data} />;
  }

  const events: EventTrimmed[] = mapEventData(data);

  return <EventsCard events={events} data={data} />;
};

export const UpcomingEventsClient = ({ data }) => {
  const [events, setEvents] = useState<EventTrimmed[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const events = await client.queries.getFutureEventsQuery({
        fromDate: today.toISOString(),
        top: data.numberOfEvents,
      });

      if (!events.data) return;
      const mappedEvents = events.data.eventsCalendarConnection.edges.map(
        (event) => ({
          ...event.node,
          startDateTime: new Date(event.node.startDateTime),
          endDateTime: new Date(event.node.endDateTime),
        })
      );
      setEvents(mappedEvents);
    };

    fetchEvents();
  }, [data.numberOfEvents]);

  return <EventsCard events={events} data={data} />;
};

const EventsCard = ({ events, data }) => (
  <div className="prose mt-5 max-w-none sm:my-0">
    <h2
      data-tina-field={tinaField(data, upcomingEventsBlock.title)}
      className="pb-1.5 text-3xl/9 font-normal text-black"
    >
      {data.title}
    </h2>
    <div className="not-prose">
      <div className="grow">
        {events.map((event, index) => (
          <UpcomingEvent event={event} key={index} />
        ))}
      </div>
      <div className="mt-3 flex flex-row-reverse justify-center sm:justify-start">
        <CustomLink
          href="/events"
          className="unstyled rounded bg-sswRed px-3 py-2 text-xs font-normal text-white hover:bg-sswDarkRed"
        >
          See more events
        </CustomLink>
      </div>
    </div>
  </div>
);

type UpcomingEventProps = {
  event: EventTrimmed;
};

const UpcomingEvent = ({ event }: UpcomingEventProps) => {
  const { relativeDate, formattedDate } = useFormatDates(event, false);

  return (
    <CustomLink
      href={event.url}
      className="unstyled no-underline"
      key={event.id}
    >
      <article className="my-2.5 grid grid-cols-4 rounded border-1 border-gray-300 bg-white p-2 shadow hover:border-ssw-black dark:border-gray-700 dark:bg-gray-800">
        <div className="col-span-3 justify-center px-3">
          <h2 className="m-0 py-1 text-sm font-bold text-black">
            {event.title}
          </h2>
          <EventsRelativeBox
            relativeDate={relativeDate}
            formattedDate={formattedDate}
            dateFontSize="text-xs"
          />
          {!!(event.presenterName || event?.presenterList?.length > 0) && (
            <span className="mt-1 inline-flex items-center text-xs text-black">
              {event.presenterName ? (
                <>{event.presenterName}</>
              ) : (
                <PresenterList presenters={event.presenterList} />
              )}
            </span>
          )}
        </div>
        <EventImageClient
          thumbnail={event.thumbnail}
          title={event.title}
          thumbnailDescription={event.thumbnailDescription}
        />
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
    previewSrc: "/images/thumbs/tina/upcoming-events.jpg",
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
