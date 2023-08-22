import { Tab, Transition } from "@headlessui/react";
import classNames from "classnames";
import Head from "next/head";
import Image from "next/image";
import { Fragment, useEffect, useMemo, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { Event, WithContext } from "schema-dts";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { formatEventDate, formatRelativeEventDate } from "../../helpers/dates";
import { EventInfo } from "../../services/server/events";
import { componentRenderer } from "../blocks/mdxComponentRenderer";
import { EventsRelativeBox } from "../events/components";
import { FilterBlock } from "./FilterBlock";
import { FilterGroupProps } from "./FilterGroup";

const NUM_EVENTS = 15;
const NUM_PAST_EVENTS = 100;

type CityMapType = Record<
  string,
  {
    name: string;
    url: string;
  }
>;

const CITY_MAP: CityMapType = {
  Sydney: {
    name: "SSW Chapel Sydney",
    url: "https://sswchapel.com.au/Sydney",
  },
  Brisbane: {
    name: "SSW Chapel Brisbane",
    url: "https://sswchapel.com.au/Brisbane",
  },
  Melbourne: {
    name: "SSW Chapel Melbourne",
    url: "https://sswchapel.com.au/Melbourne",
  },
  Newcastle: {
    name: "SSW Chapel Newcastle",
    url: "https://sswchapel.com.au/Newcastle",
  },
};

interface EventsFilterProps {
  sidebarBody: TinaMarkdownContent;
}

export const EventsFilter = ({ sidebarBody }: EventsFilterProps) => {
  const [pastSelected, setPastSelected] = useState<boolean>(false);

  const { events, filters, filteredEvents } = useEvents(
    `/api/get-upcoming-events?top=${NUM_EVENTS}`
  );

  const {
    events: pastEvents,
    filters: pastFilters,
    filteredEvents: pastFilteredEvents,
  } = useEvents(`/api/get-past-events?top=${NUM_PAST_EVENTS}`);

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

const useEvents = (apiUrl: string) => {
  const [events, setEvents] = useState<EventInfo[]>(undefined);

  const [filterControls, setFilterControls] = useState<number[]>([-1, -1]);

  const options = useMemo(() => {
    const categories =
      events
        ?.map((event) => event.Category_f5a9cf4c_x002d_8228_x00)
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.sort() || [];

    const formats =
      events
        ?.map((event) => event.CalendarType)
        ?.filter((value, index, self) => self.indexOf(value) === index)
        ?.sort() || [];

    return { categories, formats };
  }, [events]);

  const filters = useMemo<FilterGroupProps[]>(() => {
    if (!events) return [];

    const groups: FilterGroupProps[] = [
      {
        selected: filterControls[0],
        setSelected: (value) => setFilterControls((curr) => [value, curr[1]]),
        options: options.categories,
        allText: "All Technology",
      },
      {
        selected: filterControls[1],
        setSelected: (value) => setFilterControls((curr) => [curr[0], value]),
        options: options.formats,
        allText: "All Formats",
      },
    ];

    return groups;
  }, [filterControls, options]);

  const filteredEvents = useMemo(() => {
    return events?.filter(
      (event) =>
        (filterControls[0] === -1 ||
          event.Category_f5a9cf4c_x002d_8228_x00 ===
            options.categories[filterControls[0]]) &&
        (filterControls[1] === -1 ||
          event.CalendarType === options.formats[filterControls[1]])
    );
  }, [events, filterControls]);

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((json) => {
        setEvents(json);
      })
      .catch((err) => console.error(err));
  }, []);

  return { events, filters, filteredEvents };
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
      name: CITY_MAP[event.City].name,
      url: CITY_MAP[event.City].url,
    },
  };

  return (
    <>
      <Transition
        className="mb-20"
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
              <a className="!no-underline" href={event.Url.Url}>
                {event.Title}
              </a>
            </h2>

            <EventsRelativeBox
              relativeDate={formatRelativeEventDate(
                event.StartDateTime,
                event.EndDateTime
              )}
              formattedDate={formatEventDate(
                event.StartDateTime,
                event.EndDateTime
              )}
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
              {location && CITY_MAP[event.City] && (
                <span className="ml-3">
                  <strong>Location: </strong>
                  <a href={CITY_MAP[event.City].url}>
                    {CITY_MAP[event.City].name}
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: event.EventShortDescription,
          }}
          className="prose max-w-full prose-img:mx-1 prose-img:my-0 prose-img:inline"
        />
        <a href={event.Url.Url}>
          <p className="prose pt-3">Find out more...</p>
        </a>
      </Transition>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />
      </Head>
    </>
  );
};
