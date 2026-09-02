"use client";
import {
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import { ArrowCircle } from "@/components/blocks/v3/shared/arrowCircle";
import { cardShell, productTagChip } from "@/components/products/shared";
import { EventsSidebar } from "@/components/events/eventsSidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiCalendar, FiMapPin, FiTag, FiUser } from "react-icons/fi";
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
import { Presenter, PresenterList } from "../presenters/presenterList";
import { CITY_MAP } from "../util/constants/country";
import { sswOrganisation } from "../util/constants/json-ld";
import { EventFilterAllCategories } from "./FilterBlock";
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
    <EventsSidebar
      title="SSW Events"
      groups={!pastSelected ? futureFilters : pastFilters}
    >
      <TabGroup
        onChange={(index) => setPastSelected(index === 1)}
        selectedIndex={pastSelected ? 1 : 0}
      >
        <TabList className="mb-8 flex flex-row" aria-label="Event timeframe">
          <EventTab>Upcoming Events</EventTab>
          <EventTab>Past Events</EventTab>
        </TabList>
        <TabPanels>
          <TabPanel>
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
          </TabPanel>
          <TabPanel>
            <EventsList events={pastEvents} isLoading={isLoadingPastPages} />
            {hasMorePastPages && (
              <LoadMore
                load={() => {
                  fetchNextPastPage();
                }}
                isLoading={isFetchingPastPages}
              />
            )}
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {sidebarBody && (
        <div className="mt-12 border-t-0.75 border-hairline pt-8 descendant-img:py-3">
          <TinaMarkdown content={sidebarBody} components={componentRenderer} />
        </div>
      )}
    </EventsSidebar>
  );
};

const EventTab = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab as={Fragment}>
      <button
        className={cn(
          "unstyled grow border-b-0.75 border-hairline px-4 py-2.5 text-sm font-medium uppercase tracking-widest",
          "transition-colors duration-150 motion-reduce:transition-none",
          "focus-visible:ring-2 focus-visible:ring-brand",
          "text-gray-600 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground",
          "ui-selected:border-b-2 ui-selected:border-b-brand ui-selected:text-foreground"
        )}
      >
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

const EventMetaItem = ({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) => {
  if (!children) return null;

  return (
    <span className="flex min-w-0 items-center gap-2">
      <Icon className="size-4 shrink-0" />
      <span className="flex min-w-0 flex-wrap items-center gap-x-2">
        {children}
      </span>
    </span>
  );
};

const EventMetaGrid = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm font-light text-muted-foreground">
    {children}
  </div>
);

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
        as="div"
        className="mb-6"
        show={visible}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div
          className={cn(
            cardShell,
            "flex-row gap-5 p-5",
            "border-stroke-weak bg-gray-50 hover:border-brand hover:bg-white",
            "dark:border-hairline dark:bg-card dark:hover:border-brand dark:hover:bg-card-hover",
            "active:bg-gray-100 dark:active:bg-card"
          )}
        >
          {/* The whole card is the link. Everything else stays below it, so
              nested interactive elements can't end up inside an <a>. */}
          <CustomLink
            href={event.url}
            aria-label={`Find out more about ${event.title}`}
            className="unstyled absolute inset-0 z-10 rounded-card !no-underline focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-brand"
          />

          {/* Square plate with object-contain, not a full-height cover crop:
              29 of the 40 event thumbnails are 1:1, and the rest run from 1.07
              to 3.69, so a fixed ratio is the only way to show every one whole.
              White backs the transparent logos among them. */}
          {thumbnail && (
            <div className="hidden size-24 flex-none items-center justify-center rounded-card bg-white sm:flex">
              <Image
                src={thumbnail}
                alt={`${event.thumbnailDescription || event.title} logo`}
                width={96}
                height={96}
                placeholder="blur"
                blurDataURL={BluredBase64Image}
                loading="lazy"
                onError={handleImageError}
                className="size-20 object-contain"
              />
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <h2 className="m-0 p-0 text-xl font-semibold leading-tight text-foreground">
              {event.title}
            </h2>

            <EventMetaGrid>
              <EventMetaItem icon={FiCalendar}>
                {formattedDate ? (
                  <>
                    <span className="min-w-0">{formattedDate}</span>
                    {relativeDate && (
                      <span className="inline-flex shrink-0 items-center rounded-sm bg-sswRed px-1.5 pb-px pt-0.5 text-xs font-semibold uppercase leading-none text-white">
                        {relativeDate}
                      </span>
                    )}
                  </>
                ) : null}
              </EventMetaItem>
              <EventMetaItem icon={FiMapPin}>{eventSite.name}</EventMetaItem>
              <EventMetaItem icon={FiUser}>
                {event.presenterName ? (
                  event.presenterName
                ) : event.presenterList?.length > 0 ? (
                  <PresenterList presenters={event.presenterList} />
                ) : null}
              </EventMetaItem>
              <EventMetaItem icon={FiTag}>
                {[event.calendarType, event.category]
                  .filter(Boolean)
                  .map((tag) => (
                    <span key={tag} className={productTagChip}>
                      {tag}
                    </span>
                  ))}
              </EventMetaItem>
            </EventMetaGrid>
          </div>

          {/* pointer-events-none so the card-wide link keeps the click. */}
          <div className="pointer-events-none relative z-20 hidden items-end sm:flex">
            <ArrowCircle
              className="size-9 flex-none bg-gray-200 p-2 text-gray-900 dark:bg-gray-950 dark:text-white"
              iconClassName="size-3.5"
            />
          </div>
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
