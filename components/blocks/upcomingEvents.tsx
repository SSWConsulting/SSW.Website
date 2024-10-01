import Image from "next/image";
import { useState } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { useFormatDates } from "../../hooks/useFormatDates";
import { CustomLink } from "../customLink";
import { EventsRelativeBox } from "../events/eventsRelativeBox";
import { EventTrimmed } from "../filter/events";
import { PresenterList } from "../presenters/presenterList";

const fetchEvents = async (data) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const events = data.events;

  if (!events.data) return;
  const mappedEvents = events.data.eventsCalendarConnection.edges.map(
    (event) => ({
      ...event.node,
      startDateTime: new Date(event.node.startDateTime),
      endDateTime: new Date(event.node.endDateTime),
    })
  );
  return mappedEvents;
};

export const UpcomingEvents = async ({ data }) => {
  const events = await fetchEvents(data);

  return (
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
};

type UpcomingEventProps = {
  event: EventTrimmed;
};

const UpcomingEvent = ({ event }: UpcomingEventProps) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);

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
        {!imageFailed && (
          <div className="col-span-1 flex items-center justify-center sm:mr-2 sm:justify-end">
            <Image
              className={"rounded-md"}
              src={event.thumbnail}
              alt={`${event.thumbnailDescription || event.title} logo`}
              width={90}
              height={90}
              sizes="(max-width: 768px) 25vw, 50px"
              loading="lazy"
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
