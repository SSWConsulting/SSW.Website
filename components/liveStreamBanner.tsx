import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);
dayjs.extend(advancedFormat);

export const LiveStreamBanner = () => {
  const [event, setEvent] = useState({
    Title: "Loading...",
    StartDateTime: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      const datetime = dayjs.utc().format("YYYY-MM-DDTHH:mm:ss[Z]"); //Why

      const params = {
        odataFilter: encodeURIComponent(
          `$filter=Enabled ne false and EndDateTime gt datetime'${datetime}'`
        ),
        $top: 1,
        // TODO: Doesn't work
        $orderby: encodeURIComponent("StartDateTime desc"),
      };

      setLoading(true);
      const res = await axios.get(
        "https://www.ssw.com.au/ssw/SharePointEventsService.aspx",
        { params }
      );
      setLoading(false);

      if (res?.status !== 200) return;

      const event = res?.data
        .map((e) => new Event(e))
        .sort((a, z) => a.StartDateTime - z.StartDateTime)[0];
      setEvent(event);

      // if event.StartDateTime is today, show the banner
      const isToday = dayjs(event.StartDateTime).isSame(dayjs(), "day");
      setShowBanner(!isToday);
    };

    fetchEvent();
  }, []);

  if (showBanner) {
    return (
      <div className="not-prose h-liveStream bg-gray-900 bg-live-banner-wait bg-right-top bg-no-repeat p-3 uppercase">
        <h1 className="text-xl font-light text-gray-300">{event.Title}</h1>
        <p className=" text-xs text-white">
          <span className="text-sswRed">
            Airing {dayjs(event.StartDateTime).fromNow()}
            {". "}
          </span>
          ({dayjs(event.StartDateTime).format("h a")} Sydney,{" "}
          {dayjs(event.StartDateTime).format("Do MMM YYYY")}) #NetUG
        </p>
      </div>
    );
  } else {
    return <></>;
  }
};

class Event {
  Id: string;
  Url: {
    Description: string;
    Url: string;
  };
  Thumbnail: {
    Description: string;
    Url: string;
  };
  StartDateTime: Date;
  EndDateTime: Date;
  Title: string;
  Presenter: string;
  FormattedDate: string;
  RelativeDate: string;

  constructor(e) {
    this.Id = e.Id;
    this.Url = {
      Description: e.Url.Description,
      Url: e.Url.Url,
    };
    this.Thumbnail = {
      Description: e.Thumbnail.Description,
      Url: e.Thumbnail.Url,
    };
    this.StartDateTime = new Date(e.StartDateTime);
    this.EndDateTime = new Date(e.EndDateTime);
    this.Title = e.Title;
    this.Presenter = e.Presenter;
    this.FormattedDate = this.formatDate();
    this.RelativeDate = this.formatRelativeDate();
  }

  private formatDate() {
    if (!this.StartDateTime || !this.EndDateTime) return null;

    // NOTE: Omit ddd for brevity if it's next year's event
    const dateformat =
      dayjs(this.StartDateTime).year === dayjs().year
        ? "ddd MMM D"
        : "MMM D YYYY";
    const isOneDayEvent = dayjs(this.StartDateTime)
      .startOf("day")
      .isSame(dayjs(this.EndDateTime).startOf("day"));
    const startDate = dayjs(this.StartDateTime).format(dateformat);
    const endDate = dayjs(this.EndDateTime).format(dateformat);

    return isOneDayEvent ? startDate : `${startDate} - ${endDate}`;
  }
  private formatRelativeDate() {
    const now = dayjs();
    const start = dayjs(this.StartDateTime);
    const end = dayjs(this.EndDateTime);

    if (now.isBetween(start, end)) {
      return "now running";
    }

    const days = start.diff(now, "d");
    if (days === 0) {
      return "today";
    } else {
      return `${days} ${days === 1 ? "day" : "days"} to go`;
    }
  }
}
