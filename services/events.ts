import * as msal from "@azure/msal-node";
import axios from "axios";

const SITE_ID = process.env.SHAREPOINT_SITE_ID;
const EVENTS_LIST_ID = process.env.SHAREPOINT_EVENTS_LIST_ID;
const EXTERNAL_PRESENTERS_LIST_ID =
  process.env.SHAREPOINT_EXTERNAL_PRESENTERS_LIST_ID;

export const getToken = async () => {
  const clientConfig = {
    auth: {
      clientId: process.env.MICROSOFT_OAUTH_CLIENT_ID,
      authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_OAUTH_TENANT_ID}`,
      clientSecret: process.env.MICROSOFT_OAUTH_CLIENT_SECRET,
    },
  };

  const clientApp = new msal.ConfidentialClientApplication(clientConfig);

  const authParams = {
    scopes: ["https://graph.microsoft.com/.default"],
  };

  const authRes = await clientApp.acquireTokenByClientCredential(authParams);

  return authRes?.accessToken;
};

export const getEvents = async (odataFilter: string): Promise<EventInfo[]> => {
  const token = await getToken();

  const eventsRes = await axios.get<{ value: { fields: EventInfo }[] }>(
    `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${EVENTS_LIST_ID}/items?expand=fields&${odataFilter}`,
    {
      headers: {
        Authorization: "Bearer " + token,
        Accept: "application/json",
        Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly",
      },
    }
  );

  const events: EventInfo[] = eventsRes.data.value.map((item) => item.fields);

  return events || [];
};

export const getSpeakersInfo = async (ids?: number[], emails?: string[]) => {
  const speakers: SpeakerInfo[] = [];

  if (ids?.length) {
    const token = await getToken();

    const idSpeakers: SpeakerInfo[] = await Promise.all(
      ids.map(async (id) => {
        const externalSpeakersRes = await axios.get<{
          fields: SpeakerInfo;
        }>(
          `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/lists/${EXTERNAL_PRESENTERS_LIST_ID}/items/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              Accept: "application/json",
              Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly",
            },
          }
        );

        return externalSpeakersRes.data.fields;
      })
    );

    speakers.push(...idSpeakers);
  }

  if (emails?.length) {
    await Promise.all(
      emails.map(async (email) => {
        const internalSpeakerRes = await axios.get<InternalSpeakerInfo>(
          "https://www.ssw.com.au/ssw/CRMService.aspx",
          {
            params: { odata: encodeURIComponent(email) },
          }
        );

        if (internalSpeakerRes.status === 200 && internalSpeakerRes.data) {
          const internalSpeaker = internalSpeakerRes.data;
          speakers.push({
            Title: internalSpeaker.Nickname
              ? `${internalSpeaker.FirstName} (${internalSpeaker.Nickname}) ${internalSpeaker.LastName}`
              : `${internalSpeaker.FirstName} ${internalSpeaker.LastName}`,
            PresenterProfileImage: {
              Url: internalSpeaker.PhotoURL,
            },
            PresenterShortDescription: internalSpeaker.ShortDescription,
            PresenterProfileLink: internalSpeaker.ProfileURL,
          });
        }
      })
    );
  }

  return speakers;
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

export interface LiveStreamBannerInfo {
  id: string;
  StartDateTime: Date;
  EndDateTime: Date;
  StartShowBannerDateTime: Date;
  EndShowBannerDateTime: Date;
  Title: string;
  FormattedDate: string;
  RelativeDate: string;
  SSW_DelayedLiveStreamStart?: boolean;
  SSW_LiveStreamDelayMinutes?: number;
}

export interface LiveStreamWidgetInfo extends LiveStreamBannerInfo {
  YouTubeId: string;
  EventDescription: string;
  EventShortDescription: string;
  Presenter: string;
  ExternalPresenters: {
    LookupId: number;
    LookupValue: string;
  }[];
  InternalPresenters: {
    results?: {
      EMail: string;
    }[];
  };
  PresenterProfileUrl: {
    Url: string;
  };
}

export interface EventInfo extends LiveStreamWidgetInfo {
  Url: {
    Description: string;
    Url: string;
  };
  Thumbnail: {
    Description: string;
    Url: string;
  };
}

export interface SpeakerInfo {
  Title: string;
  PresenterProfileLink: string;
  PresenterProfileImage?: {
    Url: string;
  };
  PresenterShortDescription?: string;
}

export interface InternalSpeakerInfo {
  FirstName: string;
  LastName: string;
  Nickname: string;
  PhotoURL: string;
  GitHubURL: string;
  ProfileURL: string;
  ShortDescription: string;
}
