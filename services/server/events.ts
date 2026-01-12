"use server";
import { EventFilterAllCategories } from "@/components/filter/FilterBlock";
import { formatCategory } from "@/helpers/getTrimmedEvents";

import { EventTrimmed } from "@/components/filter/events";
import { VideoCardType } from "@/components/util/videoCards";
import client from "@/tina/client";
import { GetPastEventsQueryQuery } from "@/tina/types";
import { EVENTS_MAX_SIZE_OVERRIDE } from "./getEvents";

const PAGE_LENGTH = 10;

const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

export const getTodayISOString = async (): Promise<string> => {
  return getToday().toISOString();
};

const getCategoriesForFilter = (category: string) => {
  if (!category) return undefined;
  const categories = {
    "Angular and React": ["Angular and React", "Angular", "React"],
    Other: ["Other", "Non-English Courses"],
  };
  const lookup = categories[category];

  return lookup ? lookup : [category];
};

/**
 * Querying TinaCMS event data for the next UG event
 *
 * @returns Awaitable EventInfo for the next "User Group" event. If there is no future UG event scheduled then a previous one is returned
 */
export const getNextEventToBeLiveStreamed = async (): Promise<EventInfo> => {
  const currentDate = getToday().toISOString();

  let eventsData = await client.queries.getFutureEventsQuery({
    fromDate: currentDate,
    top: 1,
    calendarType: "User Groups",
  });

  if (eventsData?.data.eventsCalendarConnection.totalCount < 1) {
    eventsData = await client.queries.getPastEventsQuery({
      fromDate: currentDate,
      top: 1,
      calendarType: "User Groups",
    });
  }

  if (eventsData?.data.eventsCalendarConnection.totalCount === 0) return null;

  const event: EventInfo =
    eventsData?.data.eventsCalendarConnection.edges.map((edge) => ({
      ...edge.node,
      startDateTime: new Date(edge.node.startDateTime),
      endDateTime: new Date(edge.node.endDateTime),
      startShowBannerDateTime: new Date(edge.node.startShowBannerDateTime),
      endShowBannerDateTime: new Date(edge.node.endShowBannerDateTime),
    }))[0] ?? null;

  return event;
};

/**
 * Fetches future events from TinaCMS with pagination and filtering support
 */
export const getFutureEvents = async (
  pageParam?: string,
  category?: string,
  calendarType?: string
) => {
  const categories = getCategoriesForFilter(category);
  const res = await client.queries.getFutureEventsQuery({
    fromDate: getToday().toISOString(),
    top: PAGE_LENGTH,
    after: pageParam,
    categories,
    calendarType,
  });
  return res.data;
};

/**
 * Fetches future events from TinaCMS with a simple top limit
 * @param top Number of events to fetch
 * @param fromDate Optional date to fetch from (defaults to today)
 * @returns The events query response
 */
export const getFutureEventsSimple = async (top: number, fromDate?: string) => {
  const date = fromDate || getToday().toISOString();
  const res = await client.queries.getFutureEventsQuery({
    fromDate: date,
    top,
  });
  return res;
};

/**
 * Fetches past events from TinaCMS with pagination and filtering support
 */
export const getPastEvents = async (
  pageParam?: string,
  category?: string,
  calendarType?: string
) => {
  const categories = getCategoriesForFilter(category);
  const res = await client.queries.getPastEventsQuery({
    fromDate: getToday().toISOString(),
    top: PAGE_LENGTH,
    before: pageParam,
    categories,
    calendarType,
  });
  return res.data;
};

/**
 * Gets event categories for filtering (both past and upcoming events)
 */
export const getEventsCategories =
  async (): Promise<EventFilterAllCategories> => {
    const today: string = new Date().toISOString();

    const pastEvents = await client.queries.getPastEventsQuery({
      fromDate: today,
      top: EVENTS_MAX_SIZE_OVERRIDE,
    });
    const upcomingEvents = await client.queries.getFutureEventsQuery({
      fromDate: today,
      top: EVENTS_MAX_SIZE_OVERRIDE,
    });
    const upcomingEventsData = upcomingEvents.data;

    const pastEventsData = pastEvents.data;

    formatCategories(upcomingEventsData.eventsCalendarConnection.edges);
    formatCategories(pastEventsData.eventsCalendarConnection.edges);
    const category = "calendarType";

    const technology = "category";

    const filterCategories: EventFilterAllCategories = {
      past: {
        technologies: aggregateByCategory(pastEventsData, technology),
        categories: aggregateByCategory(pastEvents.data, category),
      },
      upcoming: {
        technologies: aggregateByCategory(upcomingEvents.data, technology),
        categories: aggregateByCategory(upcomingEvents.data, category),
      },
    };
    return filterCategories;
  };

const aggregateByCategory = (
  events: GetPastEventsQueryQuery,
  targetCategory: string
): { [key: string]: number } => {
  return events.eventsCalendarConnection.edges.reduce((occurences, event) => {
    const category = event.node[targetCategory];
    if (occurences[category]) {
      occurences[category]++;
    } else {
      occurences[category] = 1;
    }
    return occurences;
  }, {});
};

const formatCategories = (edges) => {
  for (let i = 0; i < edges.length; i++) {
    edges[i] = {
      ...edges[i],
      node: {
        ...edges[i].node,
        category: formatCategory(edges[i].node.category),
      },
    };
  }
};

/**
 * Converts properties of type Date so the object can be passed as static props
 *
 * @param event The event with Date objects
 * @returns The event Object but with strings for date properties
 */
export const convertEventDatesToStrings = (event: EventInfo) => {
  if (!event) return null;
  return {
    ...event,
    startDateTime: event?.startDateTime.toISOString(),
    endDateTime: event?.endDateTime.toISOString(),
    startShowBannerDateTime: event?.startShowBannerDateTime.toISOString(),
    endShowBannerDateTime: event?.endShowBannerDateTime.toISOString(),
  };
};

export type BookingFormSubmissionData = {
  Name: string;
  Topic: string;
  Company: string;
  Country: string;
  State: string;
  Email: string;
  Phone: string;
  Recaptcha: string;
  SourceWebPageURL: string;
  EmailSubject: string;
  EmailBody: string;
  Note?: string | null;
};

export type AddContactToNewslettersData = {
  Email: string;
  FullName: string;
};

export interface EventInfo extends EventTrimmed {
  youTubeId?: string;
  abstract?: string;
  delayedLiveStreamStart?: boolean;
  liveStreamDelayMinutes?: number;
  startShowBannerDateTime?: Date;
  endShowBannerDateTime?: Date;
  trailerUrl?: string;
  presenterList?: {
    presenter?: {
      profileImg?: string;
      torsoImg?: string;
      presenter?: {
        name?: string;
        peopleProfileURL?: string;
      };
      about?: TinaMarkdownContent;
      tip?: string;
    };
  }[];
}

type EventDates = {
  startShowBannerDateTime: Date;
  endShowBannerDateTime: Date;
  startDateTime: Date;
  endDateTime: Date;
};

type EventsRespose = Awaited<
  ReturnType<typeof client.queries.eventsContentQuery>
>;

type EventsData = EventsRespose["data"]["events"];

export const getTestimonialCategories = (events: EventsData): string[] => {
  return (
    events.testimonialCategories?.map(
      (category) => category.testimonialCategory.name
    ) || []
  );
};

export const getVideoCardProps = (events: EventsData): VideoCardType[] => {
  return (
    events.videos?.videoCards?.map<VideoCardType>((m) => ({
      title: m.title,
      link: m.link,
    })) || []
  );
};

export const formatDates = (eventInfo: EventInfoStatic): EventDates => {
  const {
    startShowBannerDateTime,
    endShowBannerDateTime,
    startDateTime,
    endDateTime,
  } = eventInfo;
  return {
    startShowBannerDateTime: new Date(startShowBannerDateTime),
    endShowBannerDateTime: new Date(endShowBannerDateTime),
    startDateTime: new Date(startDateTime),
    endDateTime: new Date(endDateTime),
  };
};

export interface EventInfoStatic
  extends Omit<
    EventInfo,
    | "startShowBannerDateTime"
    | "endShowBannerDateTime"
    | "startDateTime"
    | "endDateTime"
  > {
  startShowBannerDateTime?: string;
  endShowBannerDateTime?: string;
  startDateTime?: string;
  endDateTime?: string;
}
