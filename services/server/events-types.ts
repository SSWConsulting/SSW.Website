import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { EventTrimmed } from "../../components/filter/events";

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

