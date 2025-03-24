"use client";
import { Tab, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import type { Event, WithContext } from "schema-dts";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { BluredBase64Image } from "../../helpers/images";
import { useEvents } from "../../hooks/useEvents";
import {
  useFetchFutureEvents,
  useFetchPastEvents,
} from "../../hooks/useFetchEvents";
import { useFormatDates } from "../../hooks/useFormatDates";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { UtilityButton } from "../button/utilityButton";
import { CustomLink } from "../customLink";
import { EventsRelativeBox } from "../events/eventsRelativeBox";
import { Presenter, PresenterLinks } from "../presenters/presenterList";
import { CITY_MAP } from "../util/constants/country";
import { sswOrganisation } from "../util/constants/json-ld";
import { EventFilterAllCategories, FilterBlock } from "./FilterBlock";
import { FilterGroupProps } from "./FilterGroup";

const EVENTS_JSON_LD_LIMIT = 5;

interface EventsFilterProps {
  sidebarBody: TinaMarkdownContent;
  filterCategories: EventFilterAllCategories;
}

export type EventTrimmed = {
  hostedAtSsw?: boolean;
  id?: string;
  title: string;
  thumbnail?: string;
  thumbnailDescription?: string;
  startDateTime?: Date;
  endDateTime?: Date;
  city?: string;
  cityOther?: string;
  url: string;
  presenterList?: {
    presenter?: Presenter;
  }[];
  presenterName?: string;
  presenterProfileUrl?: string;
  calendarType?: string;
  category?: string;
  description?: TinaMarkdownContent;
};

export const EventsFilter = ({
  filterCategories,
  sidebarBody,
}: EventsFilterProps) => {
  const [pastSelected, setPastSelected] = useState<boolean>(false);
  const { past, upcoming } = filterCategories;
  const { filters: futureFilters } = useEvents(upcoming);
  const { filters: pastFilters } = useEvents(past);

  const pastSelectedFilters = useMemo<SelectedFilters>(() => {
    const filters = getFilterState(pastFilters);
    return filters;
  }, [pastFilters]);

  const futureSelectedFilters = useMemo<SelectedFilters>(() => {
    const filters = getFilterState(futureFilters);
    return filters;
  }, [futureFilters]);

  const {
    futureEvents,
    fetchFutureNextPage,
    hasMoreFuturePages,
    isFetchingFuturePages,
    isLoadingFuturePages,
  } = useFetchFutureEvents(futureSelectedFilters);

  const {
    pastEvents,
    fetchNextPastPage,
    hasMorePastPages,
    isFetchingPastPages,
    isLoadingPastPages,
  } = useFetchPastEvents(pastSelectedFilters);

  useEffect(() => {
    // Using Next.js's useSearchParams function leads to complete client-side rendering, which impacts SEO and page load performance, therefore using javascript's function
    const params = new URLSearchParams(window.location.search);
    const queryTab = params.get("past");

    if (queryTab === "1") {
      setPastSelected(true);
    }
  }, []);

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
        selectedIndex={pastSelected ? 1 : 0}
      >
        <Tab.List className="mb-8 flex flex-row">
          <EventTab>Upcoming Events</EventTab>
          <EventTab>Past Events</EventTab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel>
            <EventsList
              events={futureEvents}
              isUpcoming
              isLoading={isLoadingFuturePages}
            />
            {hasMoreFuturePages && (
              <LoadMore
                load={() => {
                  fetchFutureNextPage();
                }}
                isLoading={isFetchingFuturePages}
              />
            )}
          </Tab.Panel>
          <Tab.Panel>
            <EventsList events={pastEvents} isLoading={isLoadingPastPages} />
            {hasMorePastPages && (
              <LoadMore
                load={() => {
                  fetchNextPastPage();
                }}
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
  isUpcoming?: boolean;
  isLoading?: boolean;
}

// TODO: Compare arrays by reference instead of value https://github.com/SSWConsulting/SSW.Website/issues/3066
const arraysEqual = (arr1: EventTrimmed[], arr2: EventTrimmed[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every(
    (value: EventTrimmed, index: number) => value.id === arr2[index].id
  );
};

const EventsList = ({ events, isUpcoming, isLoading }: EventsListProps) => {
  const [firstEvents, setFirstEvents] = useState(events);
  const [secondEvents, setSecondEvents] = useState(events);
  const [visible, setVisible] = useState(true);

  // Update events and toggle visibility if `events` changes
  useEffect(() => {
    if (!arraysEqual(visible ? firstEvents : secondEvents, events)) {
      if (visible) {
        setFirstEvents(events);
      } else {
        setSecondEvents(events);
      }
      setVisible(!visible); // Toggle visibility
    }
  }, [events, visible, firstEvents, secondEvents]);

  return (
    <div>
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <LoadedEvents
            visible={!visible}
            events={firstEvents}
            isUpcoming={isUpcoming}
          />
          <LoadedEvents
            visible={visible}
            events={secondEvents}
            isUpcoming={isUpcoming}
          />
        </>
      )}
    </div>
  );
};

type AllEventsProps = {
  events: EventTrimmed[];
  isUpcoming: boolean;
  visible: boolean;
};

const LoadingIcon: React.FC = () => {
  return (
    <p className="flex flex-row text-xl">
      <FaSpinner className="m-icon animate-spin" /> Loading Events...
    </p>
  );
};

const LoadedEvents: React.FC<AllEventsProps> = ({
  visible,
  events,
  isUpcoming,
}) => {
  return (
    <>
      {events.length > 0
        ? events?.map((event, index) => {
            let eventJsonLd: WithContext<Event> = undefined;

            if (index < EVENTS_JSON_LD_LIMIT && isUpcoming) {
              eventJsonLd = {
                "@context": "https://schema.org",
                "@type": "Event",
                name: event.title,
                image: event.thumbnail,
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
                visible={visible}
                key={index}
                jsonLd={eventJsonLd}
                event={event}
              />
            );
          })
        : visible && <h3>No events found matching the filters</h3>}
    </>
  );
};

interface EventProps {
  visible?: boolean;
  event: EventTrimmed;
  jsonLd?: WithContext<Event>;
}

const Event = ({ visible, event, jsonLd }: EventProps) => {
  /* TODO: remove this when Tina cloud sync issue is fixed https://github.com/tinacms/tina-cloud/issues/2073

  We need this because there's an issue preventing us from syncing the files in the repo
  to Tina cloud. Images that aren't synced will 404.

   */

  const [thumbnail, setFallbackImage] = useState(event.thumbnail);
  useEffect(() => {
    setFallbackImage(event.thumbnail);
  }, [event.thumbnail]);

  const handleImageError = () => {
    const tinaUrl = /https:\/\/assets\.tina\.io\/[^/]+\/(.*)/;
    const match = event.thumbnail.match(tinaUrl);
    if (match) {
      setFallbackImage(`/images/${match[1]}`);
    }
  };

  const city = event.city === "Other" ? event.cityOther : event.city;
  let eventSite = { name: city, url: event.url };

  if (event.hostedAtSsw) {
    eventSite = {
      name: CITY_MAP[city]?.name,
      url: CITY_MAP[city]?.url,
    };
  }

  const { formattedDate, relativeDate } = useFormatDates(event, true);
  return (
    <>
      <Transition
        as={"div"}
        show={visible}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div className="mb-8 block md:flex md:flex-row">
          <div className="float-left mb-3 mr-3 shrink-0 pr-2 md:float-none md:pr-0">
            <Image
              className={"rounded-md"}
              height={100}
              width={100}
              placeholder="blur"
              alt={`${event.thumbnailDescription || event.title} logo`}
              src={thumbnail}
              loading="lazy"
              blurDataURL={BluredBase64Image}
              onError={handleImageError}
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
              {(event.presenterName || event.presenterList?.length > 0) && (
                <EventDescItem
                  label={
                    event?.presenterName || event?.presenterList?.length === 1
                      ? "Presenter"
                      : "Presenters"
                  }
                >
                  {event.presenterName ? (
                    <EventDescLink
                      value={event.presenterName}
                      linkValue={event.presenterProfileUrl}
                    />
                  ) : (
                    <PresenterLinks presenters={event.presenterList} />
                  )}
                </EventDescItem>
              )}
              {city && (
                <EventDescItem label="Location">
                  <EventDescLink
                    value={eventSite.name}
                    linkValue={eventSite.url}
                  />
                </EventDescItem>
              )}
              {event.calendarType && (
                <EventDescItem label="Type">
                  <EventDescLink value={event.calendarType} />
                </EventDescItem>
              )}
              {event.category && (
                <EventDescItem label="Category">
                  <EventDescLink value={event.category} />
                </EventDescItem>
              )}
            </div>
          </div>
        </div>
        <div className="prose max-w-full prose-img:mx-1 prose-img:my-0 prose-img:inline">
          <TinaMarkdown content={event?.description} />
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

type EventDescItemProps = {
  label: string;
  children: React.ReactNode;
};

const EventDescItem = ({ label, children }: EventDescItemProps) => {
  return (
    <span className="mr-2 inline-block whitespace-nowrap">
      <strong>{label}: </strong>
      {children}
    </span>
  );
};

type EventDescLinkProps = { value: string; linkValue?: string };

const EventDescLink: React.FC<EventDescLinkProps> = ({
  value,
  linkValue,
}: EventDescLinkProps) => {
  return linkValue ? (
    <CustomLink href={linkValue}>{value}</CustomLink>
  ) : (
    <>{value}</>
  );
};

interface LoadMoreProps {
  load: () => void;
  isLoading: boolean;
}

export const LoadMore = ({ load, isLoading }: LoadMoreProps) => {
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

type SelectedFilters = {
  category: string;
  technology: string;
};

const getFilterState = (filterGroup: FilterGroupProps[]): SelectedFilters => {
  const technologyGroup = filterGroup[0];
  const categoryGroup = filterGroup[1];

  const { selected: technologyIndex, options: technologyOptions } =
    technologyGroup;
  const { selected: categoryIndex, options: categoryOptions } = categoryGroup;
  return {
    category: categoryOptions[categoryIndex]?.label,
    technology: technologyOptions[technologyIndex]?.label,
  };
};
