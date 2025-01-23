import client from "@/tina/client";
import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

const WEBSITE_URL = "https://www.ssw.com.au";
export const EVENTS_MAX_SIZE_OVERRIDE = 999;
const DEFAULT_PAGE_SIZE = 10;

const CACHE_MAX_TTL = 60 * 60 * 1000; // 60 mins
const CACHE_STALE_TIME = 15 * 60 * 1000; // 15 mins

const inMemoryStorage = {
  store: {},

  getItem: async (key) => inMemoryStorage.store[key] || null,

  setItem: async (key, value) => {
    inMemoryStorage.store[key] = value;
  },

  removeItem: async (key) => {
    delete inMemoryStorage.store[key];
  },
};

const swr = createStaleWhileRevalidateCache({
  storage: inMemoryStorage,
});

const configOverrides = {
  maxTimeToLive: CACHE_MAX_TTL,
  minTimeToStale: CACHE_STALE_TIME,
};

const getEvents = async (type: "past" | "upcoming", top, presenterName) => {
  const cacheKey = `${type}-${presenterName ?? ""}-${top ?? ""}`;
  const fetcher =
    type === "past"
      ? () => fetchPastEvents(top, presenterName)
      : () => fetchUpcomingEvents(top, presenterName);

  return (await swr(cacheKey, fetcher, configOverrides)).value;
};

const fetchPastEvents = async (top, presenterName) => {
  const eventClient = await client.queries.getPastEventsQuery(
    formatEventParams(top, presenterName)
  );
  return await fetchEventsWithClient(eventClient, presenterName, top);
};

const fetchUpcomingEvents = async (top, presenterName) => {
  const eventClient = await client.queries.getFutureEventsQuery(
    formatEventParams(top, presenterName)
  );
  return await fetchEventsWithClient(eventClient, presenterName, top);
};

const formatEvent = (event) => {
  const url = event.url && fixRelativeUrl(event.url);
  return {
    Presenter: event.presenterName,
    Url: {
      Description: event.title,
      Url: url,
    },
    Title: event.title,
    Thumbnail: {
      Url: fixRelativeUrl(event.thumbnail),
      Description: event.thumbnailDescription,
    },
    PresenterProfileUrl:
      event.presenterProfileUrl && fixRelativeUrl(event.presenterProfileUrl),
    StartDateTime: event.startDateTime,
    EndDateTime: event.endDateTime,
    StartShowBannerDateTime: event.startShowBannerDateTime,
    EndShowBannerDateTime: event.endShowBannerDateTime,
    LiveStreamUrl: event.youTubeId
      ? `https://www.youtube.com/watch?v=${event.youTubeId}`
      : null,
    CalendarType: event.calendarType,
    City: event.city,
    Enabled: event.enabled,
    ShowOnPowerSessions: "No",
    NoteInternal: event.internalNote,
    HasVideo: event.youTubeId ? "Yes" : "No",
    YouTubeId: event.youTubeId,
    PresenterDescription:
      event.presenterList && event.presenterListlength > 0
        ? event.presenterList[0].presenter.about
        : null,
  };
};

export const fetchEventsWithClient = async (
  eventClient,
  presenterName: string | undefined,
  top
) => {
  if (top) {
    top = parseInt(top);
  }
  const events = [];
  /* TODO: remove back end filtering after fixing events with multiple presenters in the name
    https://github.com/SSWConsulting/SSW.Website/issues/2833  */

  for (const event of eventClient.data.eventsCalendarConnection.edges) {
    if (presenterListedInName(presenterName, event)) {
      events.push(formatEvent(event.node));
    }

    if (events.length === (top || DEFAULT_PAGE_SIZE)) {
      break;
    }
  }
  return events;
};

const fixRelativeUrl = (url: string) => {
  if (url.startsWith("/")) {
    return WEBSITE_URL + url;
  }
  return url;
};

const presenterListedInName = (
  presenterName: string | null | undefined,
  event: eventEdge
) => {
  return (
    !presenterName ||
    (event.node.presenterName &&
      event.node.presenterName
        .toLowerCase()
        .includes(presenterName.toLowerCase()))
  );
};

const formatEventParams = (
  top: string | undefined,
  presenterName: string | undefined
) => {
  let topArg = EVENTS_MAX_SIZE_OVERRIDE;
  if (!presenterName) {
    topArg = top ? parseInt(top) : DEFAULT_PAGE_SIZE;
  }

  // return the first 10 results if no presenter name is provided and no top argurment is provided
  const queryArgs = {
    fromDate: new Date().toISOString(),
    top: topArg,
  };
  console.log(queryArgs);
  return queryArgs;
};

type eventEdge = {
  node: {
    presenterName: string | null | undefined;
  };
};

export const getPastEvents = (top, presenterName) =>
  getEvents("past", top, presenterName);

export const getUpcomingEvents = (top, presenterName) =>
  getEvents("upcoming", top, presenterName);
