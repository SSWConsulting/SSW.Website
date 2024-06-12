"use client";

import { Tab, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Event, WithContext } from "schema-dts";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";

import { useEvents } from "../../hooks/useEvents";
import { useFormatDates } from "../../hooks/useFormatDates";
import { UtilityButton } from "../blocks";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { CustomLink } from "../customLink";
import { EventsRelativeBox } from "../events/eventsRelativeBox";
import { CITY_MAP } from "../util/constants/country";
import { sswOrganisation } from "../util/constants/json-ld";
import { FilterBlock } from "./FilterBlock";
import {
  useFetchFutureEvents,
  useFetchPastEvents,
} from "../../hooks/useFetchEvents";

const EVENTS_JSON_LD_LIMIT = 5;

interface EventsFilterProps {
  sidebarBody: TinaMarkdownContent;
  defaultToPastTab?: boolean;
}

export type EventTrimmed = {
  hostedAtSSW?: boolean;
  id?: string;
  title: string;
  thumbnail?: {
    url?: string;
    description?: string;
  };
  startDateTime: Date;
  endDateTime: Date;
  city?: string;
  url: string;
  presenter?: string;
  presenterProfileUrl?: string;
  calendarType?: string;
  category?: string;
  description?: string;
};

export const EventsFilter = ({
  sidebarBody,
  defaultToPastTab,
}: EventsFilterProps) => {
  const [pastSelected, setPastSelected] = useState<boolean>(defaultToPastTab);

  const {
    futureEvents,
    fetchFutureNextPage,
    hasMoreFuturePages,
    isFetchingFuturePages,
    isLoadingFuturePages,
  } = useFetchFutureEvents();
  const { filters: futureFilters, filteredEvents: filteredFutureEvents } =
    useEvents(futureEvents);

  const {
    pastEvents,
    fetchNextPastPage,
    hasMorePastPages,
    isFetchingPastPages,
    isLoadingPastPages,
  } = useFetchPastEvents(true);

  const { filters: pastFilters, filteredEvents: pastFilteredEvents } =
    useEvents(pastEvents);

  return (
    <FilterBlock
      sidebarChildren={
        <div className="descendant-img:py-3">
          <TinaMarkdown content={sidebarBody} components={componentRenderer} />
        </div>
      }
      groups={!pastSelected ? futureFilters : pastFilters}
    >
      <Tab.Group
        onChange={(index) => setPastSelected(index === 1)}
        defaultIndex={defaultToPastTab ? 1 : 0}
      >
        <Tab.List className="mb-8 flex flex-row">
          <EventTab>Upcoming Events</EventTab>
          <EventTab>Past Events</EventTab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <EventsList
              events={futureEvents}
              filteredEvents={filteredFutureEvents}
              isUpcoming
              isLoading={isLoadingFuturePages}
            />
            {hasMoreFuturePages && (
              <LoadMore
                load={fetchFutureNextPage}
                isLoading={isFetchingFuturePages}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            <EventsList
              events={pastEvents}
              filteredEvents={pastFilteredEvents}
              isLoading={isLoadingPastPages}
            />
            {hasMorePastPages && (
              <LoadMore
                load={fetchNextPastPage}
                isLoading={isFetchingPastPages}
              />
            )}
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
  isUpcoming?: boolean;
  isLoading?: boolean;
}

const EventsList = ({
  events,
  filteredEvents,
  isUpcoming,
  isLoading,
}: EventsListProps) => {
  return (
    <div>
      {!isLoading ? (
        <>
          {filteredEvents.length > 0 ? (
            events?.map((event, index) => {
              let eventJsonLd: WithContext<Event> = undefined;

              if (index < EVENTS_JSON_LD_LIMIT && isUpcoming) {
                eventJsonLd = {
                  "@context": "https://schema.org",
                  "@type": "Event",
                  name: event.title,
                  image: event.thumbnail?.url,
                  startDate: event.startDateTime?.toISOString(),
                  endDate: event.endDateTime?.toISOString(),
                  location: {
                    "@type": "Place",
                    address: {
                      "@type": "PostalAddress",
                      addressLocality: CITY_MAP[event.city]?.name,
                      addressRegion: CITY_MAP[event.city]?.state,
                      addressCountry: CITY_MAP[event.city]?.country,
                    },
                    name: CITY_MAP[event.city]?.name,
                    url: CITY_MAP[event.city]?.url,
                  },
                  eventStatus: "https://schema.org/EventScheduled",
                  eventAttendanceMode:
                    "https://schema.org/MixedEventAttendanceMode",
                  organizer: sswOrganisation,
                };
              }

              return (
                <Event
                  key={index}
                  visible={!!filteredEvents?.find((e) => e.id === event.id)}
                  event={event}
                  jsonLd={eventJsonLd}
                />
              );
            })
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
  jsonLd?: WithContext<Event>;
}

const Event = ({ visible, event, jsonLd }: EventProps) => {
  let eventSite;
  if (event.hostedAtSSW) {
    const { city } = event;
    eventSite = {
      name: CITY_MAP[city]?.name,
      url: CITY_MAP[city]?.url,
    };
  } else eventSite = { name: event.city, url: event.url };

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
              alt={event.thumbnail?.description}
              src={event.thumbnail?.url}
            />
          </div>
          <div>
            <h2 className="my-0 font-semibold">
              <CustomLink className="!no-underline" href={event.url}>
                {event.title}
              </CustomLink>
            </h2>

            <EventsRelativeBox
              relativeDate={relativeDate}
              formattedDate={formattedDate}
              dateFontSize="text-s"
            />

            <div>
              {event.presenter && (
                <EventDescItem
                  label="Presenter"
                  linkValue={event?.presenterProfileUrl}
                  value={event.presenter}
                />
              )}
              {event.city && CITY_MAP[event.city] && (
                <EventDescItem
                  label="Location"
                  value={eventSite.name}
                  linkValue={eventSite.url}
                />
              )}
              {event.calendarType && (
                <EventDescItem label="Type" value={event.calendarType} />
              )}
              {event.category && (
                <EventDescItem label="Category" value={event.category} />
              )}
            </div>
          </div>
        </div>
        <div className="prose max-w-full prose-img:mx-1 prose-img:my-0 prose-img:inline">
          {event.description.split("\n\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mb-1 mt-6 p-0 text-end">
          <CustomLink
            href={event.url}
            title={event.title}
            className="unstyled rounded bg-ssw-gray px-3 py-2 text-xs font-normal text-white hover:bg-ssw-gray-dark"
          >
            <span className="mt-8 text-sm">Find out more...</span>
          </CustomLink>
        </div>
      </Transition>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
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

interface LoadMoreProps {
  load: () => void;
  isLoading: boolean;
}

const LoadMore = ({ load, isLoading }: LoadMoreProps) => {
  return (
    <div className="flex flex-col items-center">
      <UtilityButton
        onClick={() => !isLoading && load()}
        buttonText="Load More"
        size="small"
        className="!mt-0"
      />
      {isLoading && (
        <p className="flex flex-row items-center pt-3 text-base">
          <FaSpinner className="m-icon animate-spin" /> Loading more...
        </p>
      )}
    </div>
  );
};
