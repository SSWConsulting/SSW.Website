import axios from "axios";
import { AxiosResponse } from "axios";
import dayjs, { Dayjs } from "dayjs";

const odataDateFormat = "YYYY-MM-DDTHH:mm:ss[Z]";

export const createLead = async (data: BookingFormSubmissionData) => {
  return await axios.post("/ssw/api/crm/createlead", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getLiveStreamBannerInfo = async (datetime: Dayjs) => {
  const dateFilter = datetime.format(odataDateFormat);
  const odataFilter = `$filter=Enabled ne false \
and StartShowBannerDateTime le datetime'${dateFilter}' \
and EndShowBannerDateTime ge datetime'${dateFilter}'\
&$orderby=StartDateTime asc\
&$top=1`;

  return await axios.get<LiveStreamBannerInfo[]>(
    "https://ssw.com.au/ssw/SharePointEventsService.aspx",
    {
      params: { odataFilter: encodeURIComponent(odataFilter) },
    }
  );
};

export const getUpcomingEvents = async (datetime: Dayjs, top: number) => {
  const dateFilter = datetime.format(odataDateFormat);
  const odataFilter = `$filter=Enabled ne false \
and EndDateTime gt datetime'${dateFilter}'\
&$orderby=StartDateTime asc\
&$top=${top}`;

  const res = await axios.get<EventInfo[]>(
    "https://ssw.com.au/ssw/SharePointEventsService.aspx",
    {
      params: { odataFilter: encodeURIComponent(odataFilter) },
    }
  );

  !!res.data &&
    Array.isArray(res.data) &&
    res.data.forEach((b) => {
      b.FormattedDate = formatBannerDate(b);
      b.RelativeDate = formatRelativeBannerDate(b);
    });

  return res;
};

export const getLiveStreamWidgetInfo = async (datetime: Dayjs) => {
  const dateFilter = datetime.format(odataDateFormat);
  const odataFilter = `$filter=Enabled ne false \
and StartShowBannerDateTime le datetime'${dateFilter}' \
and EndShowBannerDateTime ge datetime'${dateFilter}'\
&$orderby=StartDateTime asc\
&$top=1\
&$select=*,InternalPresenters/EMail&$expand=InternalPresenters/Id`;

  const eventsRes = await axios.get<LiveStreamWidgetInfo[]>(
    "https://ssw.com.au/ssw/SharePointEventsService.aspx",
    {
      params: { odataFilter: encodeURIComponent(odataFilter) },
    }
  );

  const event = eventsRes.data?.length ? eventsRes.data[0] : null;

  const eventRes: AxiosResponse<LiveStreamWidgetInfo> = {
    ...eventsRes,
    data: {
      ...event,
      ChannelId: "UCBFgwtV9lIIhvoNh0xoQ7Pg", // hard coded for now
    },
  };

  return eventRes;
};

export const getExternalSpeakerInfo = async (id: string) => {
  const odataFilter = `$filter=Id eq ${id}`;

  const speakersRes = await axios.get<ExternalSpeakerInfo[]>(
    "https://ssw.com.au/ssw/SharePointExternalSpeakersService.aspx",
    {
      params: { odataFilter: encodeURIComponent(odataFilter) },
    }
  );

  const speaker = speakersRes.data?.length ? speakersRes.data[0] : null;

  const speakerRes: AxiosResponse<ExternalSpeakerInfo> = {
    ...speakersRes,
    data: {
      ...speaker,
    },
  };

  return speakerRes;
};

const formatBannerDate = (bannerInfo: LiveStreamBannerInfo) => {
  if (!bannerInfo.StartDateTime || !bannerInfo.EndDateTime) return null;

  // NOTE: Omit ddd for brevity if it's next year's event
  const dateformat =
    dayjs(bannerInfo.StartDateTime).year === dayjs().year
      ? "ddd MMM D"
      : "MMM D YYYY";
  const isOneDayEvent = dayjs(bannerInfo.StartDateTime)
    .startOf("day")
    .isSame(dayjs(bannerInfo.EndDateTime).startOf("day"));
  const startDate = dayjs(bannerInfo.StartDateTime).format(dateformat);
  const endDate = dayjs(bannerInfo.EndDateTime).format(dateformat);

  return isOneDayEvent ? startDate : `${startDate} - ${endDate}`;
};

const formatRelativeBannerDate = (bannerInfo: LiveStreamBannerInfo) => {
  const now = dayjs();
  const start = dayjs(bannerInfo.StartDateTime);
  const end = dayjs(bannerInfo.EndDateTime);

  if (now.isBetween(start, end)) {
    return "now running";
  }

  const days = start.diff(now, "d");
  if (days === 0) {
    return "today";
  } else {
    return `${days} ${days === 1 ? "day" : "days"} to go`;
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

export interface LiveStreamBannerInfo {
  Id: string;
  StartDateTime: Date;
  EndDateTime: Date;
  Title: string;
  FormattedDate: string;
  RelativeDate: string;
}

export interface EventInfo extends LiveStreamBannerInfo {
  Url: {
    Description: string;
    Url: string;
  };
  Thumbnail: {
    Description: string;
    Url: string;
  };
  Presenter: string;
}

export interface LiveStreamWidgetInfo extends LiveStreamBannerInfo {
  YouTubeId: string;
  ChannelId: string;
  EventDescription: string;
  ExternalPresentersId: {
    results: string[];
  };
}

export interface ExternalSpeakerInfo {
  Title: string;
  PresenterProfileImage: {
    Url: string;
  };
  PresenterShortDescription: string;
  PresenterProfileLink: string;
}
