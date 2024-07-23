import client from "@/tina/client";

const WEBSITE_URL = "https://ssw.com.au";
const EVENTS_MAX_SIZE_OVERRIDE = 999;
const DEFAULT_PAGE_SIZE = 10;

export const getPastEvents = async (top, presenterName) => {
  const eventClient = await client.queries.getPastEventsQuery(
    formatEventParams(top, presenterName)
  );
  return await fetchEventsWithClient(eventClient, presenterName, top);
};

export const getUpcomingEvents = async (top, presenterName) => {
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
