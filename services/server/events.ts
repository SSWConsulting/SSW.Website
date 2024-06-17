import { EventTrimmed } from "../../components/filter/events";
import client from "../../tina/__generated__/client";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";

/**
 * Querying TinaCMS event data for the next UG event
 *
 * @returns Awaitable EventInfo for the next "User Group" event. If there is no future UG event scheduled then a previous one is returned
 */
export const getNextEventToBeLiveStreamed = async (): Promise<EventInfo> => {
  const currentDate = new Date().toISOString();

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
