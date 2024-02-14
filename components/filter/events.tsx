import { Tab, Transition } from "@headlessui/react";
import classNames from "classnames";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Event, WithContext } from "schema-dts";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import {
  formatEventLongDate,
  formatRelativeEventDate,
} from "../../helpers/dates";
import { sanitiseXSS } from "../../helpers/validator";
import { useEvents } from "../../hooks/useEvents";
import { EventInfo } from "../../services/server/events";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { CustomLink } from "../customLink";
import { EventsRelativeBox } from "../events/eventsRelativeBox";
import { CITY_MAP } from "../util/constants/country";
import { sswOrganisation } from "../util/constants/json-ld";
import { FilterBlock } from "./FilterBlock";

interface EventsFilterProps {
  sidebarBody: TinaMarkdownContent;
  events: EventInfo[];
  pastEvents: EventInfo[];
}

export const EventsFilter = ({
  sidebarBody,
  events,
  pastEvents,
}: EventsFilterProps) => {
  const [pastSelected, setPastSelected] = useState<boolean>(false);

  const { filters, filteredEvents } = useEvents(events);

  const { filters: pastFilters, filteredEvents: pastFilteredEvents } =
    useEvents(pastEvents);

  return (
    <FilterBlock
      sidebarChildren={
        <div className="descendant-img:py-3">
          <TinaMarkdown content={sidebarBody} components={componentRenderer} />
        </div>
      }
      groups={!pastSelected ? filters : pastFilters}
    >
      <Tab.Group>
        <Tab.List className="mb-8 flex flex-row">
          <Tab as={Fragment}>
            {({ selected }) => {
              setPastSelected(!selected);
              return (
                <button
                  className={classNames(
                    "flex-grow border-b-2 border-b-sswRed py-2 uppercase tracking-widest hover:bg-gray-100",
                    selected ? "bg-gray-100" : "hover:bg-gray-50"
                  )}
                >
                  Upcoming Events
                </button>
              );
            }}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => {
              setPastSelected(selected);
              return (
                <button
                  className={classNames(
                    "flex-grow border-b-2 border-b-sswRed py-2 uppercase tracking-widest",
                    selected ? "bg-gray-100" : "hover:bg-gray-50"
                  )}
                >
                  Past Events
                </button>
              );
            }}
          </Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <EventsList events={events} filteredEvents={filteredEvents} />
          </Tab.Panel>
          <Tab.Panel>
            <EventsList
              events={pastEvents}
              filteredEvents={pastFilteredEvents}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </FilterBlock>
  );
};

interface EventsListProps {
  events: EventInfo[];
  filteredEvents: EventInfo[];
}

const EventsList = ({ events, filteredEvents }: EventsListProps) => {
  return (
    <div>
      {filteredEvents ? (
        <>
          {filteredEvents.length > 0 ? (
            events?.map((event, index) => (
              <Event
                key={index}
                visible={!!filteredEvents?.find((e) => e.id === event.id)}
                event={event}
              />
            ))
          ) : (
            <h3>No events found matching the filters</h3>
          )}
        </>
      ) : (
        <p className="flex flex-row text-xl">
          <FaSpinner className="m-icon animate-spin" /> Loading Events...
        </p>
      )}
    </div>
  );
};

interface EventProps {
  visible?: boolean;
  event: EventInfo;
}

const Event = ({ visible, event }: EventProps) => {
  const eventJsonLd: WithContext<Event> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.Title,
    image: event.Thumbnail.Url,
    startDate: new Date(event.StartDateTime).toISOString(),
    endDate: new Date(event.EndDateTime).toISOString(),
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: CITY_MAP[event.City]?.name,
        addressRegion: CITY_MAP[event.City]?.state,
        addressCountry: CITY_MAP[event.City]?.country,
      },
      name: CITY_MAP[event.City]?.name,
      url: CITY_MAP[event.City]?.url,
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    description: event.Url.Description,
    performer: sswOrganisation,
    organizer: sswOrganisation,
  };

  const eventSite = event.Url.Url.toLowerCase()?.includes("ssw.com.au")
    ? { name: CITY_MAP[event.City]?.name, url: CITY_MAP[event.City]?.url }
    : { name: event.City, url: event.Url.Url };

  return (
    <>
      <Transition
        className="mb-16 border-b-1 pb-16"
        show={!!visible}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="mb-8 flex max-md:flex-col md:flex-row">
          <div className="mr-3 shrink-0">
            <Image
              className="rounded-md max-md:pb-3"
              height={100}
              width={100}
              alt={event.Thumbnail.Description}
              src={event.Thumbnail.Url}
            />
          </div>
          <div>
            <h2 className="my-0 font-semibold">
              <CustomLink className="!no-underline" href={event.Url.Url}>
                {event.Title}
              </CustomLink>
            </h2>

            <EventsRelativeBox
              relativeDate={formatRelativeEventDate(
                event.StartDateTime,
                event.EndDateTime
              )}
              formattedDate={formatEventLongDate(
                event.StartDateTime,
                event.EndDateTime
              )}
              dateFontSize="text-s"
            />

            <div>
              {event.CalendarType && (
                <>
                  <strong>Type:</strong> {event.CalendarType}{" "}
                </>
              )}
              {event.Presenter && (
                <>
                  <strong>Presenter: </strong>
                  {event.Presenter}
                </>
              )}
              {event.City && CITY_MAP[event.City] && (
                <span className="ml-3">
                  <strong>Location: </strong>
                  <CustomLink href={eventSite.url}>{eventSite.name}</CustomLink>
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitiseXSS(event.EventShortDescription) || "",
          }}
          className="prose max-w-full prose-img:mx-1 prose-img:my-0 prose-img:inline"
        />
        <CustomLink href={event.Url.Url} title={event.Url.Description}>
          <p className="prose pt-3">Find out more...</p>
        </CustomLink>
      </Transition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </>
  );
};
