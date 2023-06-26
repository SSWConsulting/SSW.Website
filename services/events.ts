import * as msal from "@azure/msal-node";
import axios from "axios";

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
  const siteId =
    "sswcom.sharepoint.com,8b375f80-d2e4-42a5-9ed3-54a3cfeb61b5,732990a3-6822-4895-b68a-3653da9f5910";
  const listId = "5502e86d-ad16-4eb4-a41c-ac33c9a08382";

  const encodedFilter = encodeURIComponent(odataFilter);

  const token = await getToken();

  try {
    const eventsRes = await fetch(
      `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${listId}/items?expand=fields&${odataFilter}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          Accept: "application/json",
          Prefer: "HonorNonIndexedQueriesWarningMayFailRandomly",
        },
      }
    );

    const eventsBody = await eventsRes.json();
    console.log(eventsBody);
    const events: EventInfo[] = eventsBody.value.map((item) => {
      return item.fields;
    });

    return events;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getLiveStreamBannerInfo = async (datetime: string) => {
  const odataFilter = `$filter=Enabled ne false \
and EndDateTime ge datetime'${datetime}'\
and CalendarType eq 'User Groups'\
&$orderby=StartDateTime asc\
&$top=1`;

  return await axios.get<LiveStreamBannerInfo[]>(
    "https://www.ssw.com.au/ssw/SharePointEventsService.aspx",
    {
      params: { odataFilter: encodeURIComponent(odataFilter) },
    }
  );
};

export const getSpeakersInfo = async (ids?: string[], emails?: string[]) => {
  const speakers: SpeakerInfo[] = [];

  if (ids?.length) {
    const externalSpeakerFilter = `$filter=${ids
      .map((id) => `Id eq ${id}`)
      .join(" or ")}`;

    const externalSpeakersRes = await axios.get<SpeakerInfo[]>(
      "https://www.ssw.com.au/ssw/SharePointExternalSpeakersService.aspx",
      {
        params: { odataFilter: encodeURIComponent(externalSpeakerFilter) },
      }
    );

    externalSpeakersRes.status === 200 &&
      speakers.push(...externalSpeakersRes.data);
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
  Id: string;
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
  ChannelId: string;
  EventDescription: string;
  EventShortDescription: string;
  Presenter: string;
  ExternalPresentersId: {
    results?: string[];
  };
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
