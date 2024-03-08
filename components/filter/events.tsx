import { Tab, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Event, WithContext } from "schema-dts";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { sanitiseXSS } from "../../helpers/validator";
import { useEvents } from "../../hooks/useEvents";
import { useFormatDates } from "../../hooks/useFormatDates";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { CustomLink } from "../customLink";
import { EventsRelativeBox } from "../events/eventsRelativeBox";
import { CITY_MAP } from "../util/constants/country";
import { sswOrganisation } from "../util/constants/json-ld";
import { FilterBlock } from "./FilterBlock";

interface EventsFilterProps {
  sidebarBody: TinaMarkdownContent;
  events: EventTrimmed[];
  pastEvents: EventTrimmed[];
}

export type EventTrimmed = {
  id: string;
  Title: string;
  Thumbnail: {
    Url: string;
    Description: string;
  };
  StartDateTime: Date;
  EndDateTime: Date;
  City: string;
  Url: {
    Url: string;
    Description: string;
  };
  Presenter?: string;
  PresenterProfileUrl?: {
    Url: string;
  };
  CalendarType?: string;
  Category_f5a9cf4c_x002d_8228_x00?: string;
  EventShortDescription: string;
};

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
      <Tab.Group onChange={(index) => setPastSelected(index === 1)}>
        <Tab.List className="mb-8 flex flex-row">
          <EventTab>Upcoming Events</EventTab>
          <EventTab>Past Events</EventTab>
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

const EventTab = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab as={Fragment}>
      <button className="grow border-b-2 border-b-sswRed py-2 uppercase tracking-widest hover:bg-gray-50 ui-selected:bg-gray-100">
        {children}
      </button>
    </Tab>
  );
};

interface EventsListProps {
  events: EventTrimmed[];
  filteredEvents: EventTrimmed[];
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
  event: EventTrimmed;
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

  const eventSite = event?.Url?.Url?.toLowerCase()?.includes("ssw.com.au")
    ? { name: CITY_MAP[event.City]?.name, url: CITY_MAP[event.City]?.url }
    : { name: event.City, url: event.Url.Url };

  const { formattedDate, relativeDate } = useFormatDates(event, true);

  return (
    <>
      <Transition
        className="mb-15 border-b-1 bg-white pb-8"
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
              relativeDate={relativeDate}
              formattedDate={formattedDate}
              dateFontSize="text-s"
            />

            <div>
              {event.Presenter && (
                <EventDescItem
                  label="Presenter"
                  linkValue={event?.PresenterProfileUrl?.Url}
                  value={event.Presenter}
                />
              )}
              {event.City && CITY_MAP[event.City] && (
                <EventDescItem
                  label="Location"
                  value={eventSite.name}
                  linkValue={eventSite.url}
                />
              )}
              {event.CalendarType && (
                <EventDescItem label="Type" value={event.CalendarType} />
              )}
              {event.Category_f5a9cf4c_x002d_8228_x00 && (
                <EventDescItem
                  label="Category"
                  value={event.Category_f5a9cf4c_x002d_8228_x00}
                />
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
        <div className="mb-1 mt-6 p-0 text-end">
          <CustomLink
            href={event.Url.Url}
            title={event.Url.Description}
            className="unstyled rounded bg-ssw-gray px-3 py-2 text-xs font-normal text-white hover:bg-ssw-gray-dark"
          >
            <span className="mt-8 text-sm">Find out more...</span>
          </CustomLink>
        </div>
      </Transition>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
    </>
  );
};

type EventDescItemProps = { label: string; value: string; linkValue?: string };

const EventDescItem = ({ label, value, linkValue }: EventDescItemProps) => {
  return (
    <span className="mr-2 inline-block whitespace-nowrap">
      <strong>{label}: </strong>

      {linkValue ? (
        <CustomLink href={linkValue}>{value}</CustomLink>
      ) : (
        <>{value}</>
      )}
    </span>
  );
};
