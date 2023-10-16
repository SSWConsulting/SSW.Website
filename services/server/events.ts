import * as msal from "@azure/msal-node";
import axios from "axios";

const SITE_ID = process.env.SHAREPOINT_SITE_ID;
const EVENTS_LIST_ID = process.env.SHAREPOINT_EVENTS_LIST_ID;
const EXTERNAL_PRESENTERS_LIST_ID =
  process.env.SHAREPOINT_EXTERNAL_PRESENTERS_LIST_ID;

const SHAREPOINT_SCOPES = ["https://graph.microsoft.com/.default"];
const DYNAMICS_SCOPES = ["https://ssw.crm6.dynamics.com/.default"];

export const getToken = async (
  scopes: string[],
  clientId: string,
  clientSecret
) => {
  const clientConfig = {
    auth: {
      clientId,
      authority: `https://login.microsoftonline.com/${process.env.MICROSOFT_OAUTH_TENANT_ID}`,
      clientSecret,
    },
  };

  const clientApp = new msal.ConfidentialClientApplication(clientConfig);

  const authParams = {
    scopes,
  };

  const authRes = await clientApp.acquireTokenByClientCredential(authParams);

  return authRes?.accessToken;
};

export const getEvents = async (odataFilter: string): Promise<EventInfo[]> => {
  if (
    process.env.NODE_ENV === "development" &&
    !process.env.MICROSOFT_OAUTH_TENANT_ID
  ) {
    console.warn(
      "⚠️ You are missing the SharePoint environment variables. Please see the .env.example file for the required variables."
    );
    return [];
  }

  const token = await getToken(
    SHAREPOINT_SCOPES,
    process.env.MICROSOFT_OAUTH_CLIENT_ID,
    process.env.MICROSOFT_OAUTH_CLIENT_SECRET
  );

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

export const getSpeakersInfoFromEvent = async (
  event: EventInfo
): Promise<SpeakerInfo[]> => {
  const ids: number[] = [];

  if (event?.ExternalPresenters?.length) {
    const presenterIds = event.ExternalPresenters.map(
      (presenter) => presenter.LookupId
    );
    ids.push(...presenterIds);
  }

  const emails: string[] = [];

  if (event?.InternalPresenters?.results?.length) {
    emails.push(...event.InternalPresenters.results.map((i) => i.EMail));
  }

  const speakers = await getSpeakersInfo(ids, emails);

  return speakers;
};

export const getSpeakersInfo = async (ids?: number[], emails?: string[]) => {
  const speakers: SpeakerInfo[] = [];

  if (
    process.env.NODE_ENV === "development" &&
    !process.env.MICROSOFT_OAUTH_TENANT_ID
  ) {
    console.warn(
      "⚠️ You are missing the SharePoint environment variables required for speakers. Please see the .env.example file for the required variables."
    );
    return [];
  }

  if (ids?.length) {
    const token = await getToken(
      SHAREPOINT_SCOPES,
      process.env.MICROSOFT_OAUTH_CLIENT_ID,
      process.env.MICROSOFT_OAUTH_CLIENT_SECRET
    );

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
    const internalSpeakers = await getInternalSpeakers(emails);

    const internalSpeakersInfo: SpeakerInfo[] = internalSpeakers.map(
      (internalSpeaker) => ({
        Title: internalSpeaker.Nickname
          ? `${internalSpeaker.FirstName} (${internalSpeaker.Nickname}) ${internalSpeaker.LastName}`
          : `${internalSpeaker.FirstName} ${internalSpeaker.LastName}`,
        PresenterProfileImage: {
          Url: internalSpeaker.PhotoURL,
        },
        PresenterShortDescription: internalSpeaker.ShortDescription,
        PresenterProfileLink: internalSpeaker.ProfileURL,
      })
    );

    speakers.push(...internalSpeakersInfo);
  }

  return speakers;
};

export const getInternalSpeakers = async (
  emails: string[]
): Promise<InternalSpeakerInfo[]> => {
  if (
    process.env.NODE_ENV === "development" &&
    (!process.env.DYNAMICS_CLIENT_ID || !process.env.DYNAMICS_CLIENT_SECRET)
  ) {
    console.warn(
      "⚠️ You are missing the Dynamics 365 environment variables required for speakers. Please see the .env.example file for the required variables."
    );
    return [];
  }

  const accessToken = await getToken(
    DYNAMICS_SCOPES,
    process.env.DYNAMICS_CLIENT_ID,
    process.env.DYNAMICS_CLIENT_SECRET
  );

  let odataFilter = "";

  emails.forEach((email, index) => {
    if (index === emails.length - 1) {
      odataFilter += `internalemailaddress eq '${email}'`;
    } else {
      odataFilter += `internalemailaddress eq '${email}' or `;
    }
  });

  const internalSpeakersRes = await axios.get(
    "https://ssw.crm6.dynamics.com/api/data/v9.2/systemusers?$select=firstname,lastname,nickname,photourl,ssw_githuburl,ssw_publicprofileurl,ssw_shortdescription,internalemailaddress&$filter=" +
      odataFilter,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
        Accept: "application/json",
        "OData-MaxVersion": "4.0",
        "OData-Version": "4.0",
      },
    }
  );

  if (internalSpeakersRes?.data?.value?.length > 0) {
    const speakers: InternalSpeakerInfo[] = internalSpeakersRes.data.value.map(
      (user) => ({
        FirstName: user.firstname,
        LastName: user.lastname,
        Nickname: user.nickname,
        PhotoURL: user.photourl,
        GitHubURL: user.ssw_githuburl,
        ProfileURL: user.ssw_publicprofileurl,
        ShortDescription: user.ssw_shortdescription,
      })
    );

    return speakers;
  } else {
    return [];
  }
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
  Abstract: string;
  Category_f5a9cf4c_x002d_8228_x00: string; // Category, SharePoint formatted name
  CalendarType: string;
  Url: {
    Description: string;
    Url: string;
  };
  Thumbnail: {
    Description: string;
    Url: string;
  };
  TrailerUrl: {
    Description: string;
    Url: string;
  };
  City: string;
}

export interface SpeakerInfo {
  Title: string;
  PresenterProfileLink: string;
  PresenterProfileImage?: {
    Url: string;
  };
  PresenterShortDescription?: string;
  TorsoImage?: {
    Url: string;
    Description: string;
  };
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
