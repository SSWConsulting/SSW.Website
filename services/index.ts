import axios from "axios";
import dayjs, { Dayjs } from "dayjs";

export const createLead = async (data: BookingFormSubmissionData) => {
  return await axios.post("/ssw/api/crm/createlead", data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const getLiveStreamBannerInfo = async (datetime: Dayjs) => {
  const dateFilter = datetime.format();
  const oDataFilter = `$filter=Enabled ne false \
    and StartShowBannerDateTime le datetime'${dateFilter}' \
    and EndShowBannerDateTime ge datetime'${dateFilter}'\
    &$orderby=StartDateTime asc\
    &$top=1`;

  return await axios.get<LiveStreamBannerInfo[]>(
    "https://ssw.com.au/ssw/SharePointEventsService.aspx",
    {
      params: { oDataFilter: encodeURIComponent(oDataFilter) },
    }
  );

  // return {
  //   url: "https://www.youtube.com/embed/QYTa5aHdhh0?rel=0&autoplay=1",
  // };
};

export const getUpcomingEvents = async (datetime: Dayjs, top: number) => {
  const dateFilter = datetime.format();
  const oDataFilter = `$filter=Enabled ne false \
    and EndDateTime gt datetime'${dateFilter}'\
    &$orderby=StartDateTime asc\
    &$top=${top}`;

  const res = await axios.get<EventInfo[]>(
    "https://ssw.com.au/ssw/SharePointEventsService.aspx",
    {
      params: { oDataFilter: encodeURIComponent(oDataFilter) },
    }
  );

  !!res.data &&
    res.data.forEach((b) => {
      b.FormattedDate = formatBannerDate(b);
      b.RelativeDate = formatRelativeBannerDate(b);
    });

  return res;
};

export const getLiveStreamWidgetInfo = async (datetime: Dayjs) => {
  const dateFilter = datetime.format();
  const oDataFilter = `$filter=Enabled ne false \
    and StartShowBannerDateTime le datetime'${dateFilter}' \
    and EndShowBannerDateTime ge datetime'${dateFilter}'\
    &$orderby=StartDateTime asc\
    &$top=1\
    &$select=*,InternalPresenters/EMail&$expand=InternalPresenters/Id`;

  return await axios.get<LiveStreamWidgetInfo[]>(
    "https://ssw.com.au/ssw/SharePointEventsService.aspx",
    {
      params: { oDataFilter: encodeURIComponent(oDataFilter) },
    }
  );
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
}
