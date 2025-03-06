import client from "@/tina/client";
import { LRUCache } from "lru-cache";
import { createStaleWhileRevalidateCache } from "stale-while-revalidate-cache";

const WEBSITE_URL = "https://www.ssw.com.au";
export const EVENTS_MAX_SIZE_OVERRIDE = 999;
const DEFAULT_PAGE_SIZE = 10;

const CACHE_MAX_TTL = 60 * 60 * 1000; // 60 mins
const CACHE_STALE_TIME = 15 * 60 * 1000; // 15 mins
const CACHE_LRU_MAX_ENTRIES = 1000; // Maximum number of cache entries

const VALID_TOP_VALUES = ["10", "20", "50"]; // Limit the values that are cached
const MAX_PRESENTER_NAME_LENGTH = 100; // Limit the cache key length

const inMemoryStorage = {
  store: new LRUCache({
    max: CACHE_LRU_MAX_ENTRIES,
    ttl: CACHE_MAX_TTL,
  }),

  getItem: async (key) => inMemoryStorage.store.get(key) || null,
  setItem: async (key, value) => {
    inMemoryStorage.store.set(key, value);
  },
  removeItem: async (key) => {
    inMemoryStorage.store.delete(key);
  },
};

const swr = createStaleWhileRevalidateCache({
  storage: inMemoryStorage,
});

const configOverrides = {
  maxTimeToLive: CACHE_MAX_TTL,
  minTimeToStale: CACHE_STALE_TIME,
};

const isValidTop = (top) =>
  top === undefined || top === null || VALID_TOP_VALUES.includes(top);

const normalizePresenterName = (name) => {
  const trimmedName = name?.trim().toLowerCase().replaceAll(" ", "-") || "";
  return trimmedName.slice(0, MAX_PRESENTER_NAME_LENGTH);
};

const generateCacheKey = (type, top, presenterName) => {
  if (!isValidTop(top)) return null;

  const normalizedTop = top === undefined ? DEFAULT_PAGE_SIZE : top;
  const normalizedPresenterName = normalizePresenterName(presenterName);
  return `${type}-${normalizedTop}-${normalizedPresenterName}`;
};

const getEvents = async (type: "past" | "upcoming", top, presenterName) => {
  const fetchEvents = type === "past" ? fetchPastEvents : fetchUpcomingEvents;

  const cacheKey = generateCacheKey(type, top, presenterName);
  if (!cacheKey) {
    return fetchEvents(top, presenterName);
  }

  return (
    await swr(cacheKey, () => fetchEvents(top, presenterName), configOverrides)
  ).value;
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
      event.presenterList && event.presenterList.length > 0
        ? event.presenterList[0].presenter.about
        : null,
  };
};

export const fetchEventsWithClient = async (
  eventClient,
  presenterName: string | undefined,
  top
) => {
  const normalizedTop = parseInt(top) || DEFAULT_PAGE_SIZE;
  const events = [];
  /* TODO: remove back end filtering after fixing events with multiple presenters in the name
    https://github.com/SSWConsulting/SSW.Website/issues/2833  */

  for (const event of eventClient.data.eventsCalendarConnection.edges) {
    if (presenterListedInName(presenterName, event)) {
      events.push(formatEvent(event.node));
    }

    if (events.length === normalizedTop) {
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
