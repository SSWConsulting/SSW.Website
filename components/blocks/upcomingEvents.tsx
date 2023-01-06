import React, { useEffect, useState } from "react";
import type { Template } from "tinacms";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";

import Link from "next/link";

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export const UpcomingEvents = ({ data }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const datetime = dayjs.utc().startOf("day").format();
      const params = {
        odataFilter: encodeURIComponent(
          `$filter=Enabled ne false and EndDateTime gt datetime'${datetime}'`
        ),
        $top: data.numberOfEvents,
        // TODO: Doesn't work
        $orderby: encodeURIComponent("StartDateTime desc"),
      };

      setLoading(true);
      const res = await axios.get(
        `https://www.ssw.com.au/ssw/SharePointEventsService.aspx`,
        { params }
      );
      setLoading(false);

      if (res?.status !== 200) return;
      const events = res?.data
        .map((e) => new Event(e))
        .sort((a, z) => a.StartDateTime - z.StartDateTime);
      setEvents(events);
    };

    fetchEvents();
  }, []);

  return (
    <div className="not-prose00">
      <h2 className="text-2xl font-light pb-5">{data.title}</h2>
      <div className="full flex-column">
        <div className="max-h-128 bg-gray-100 overflow-y-scroll overflow-x-hidden border-2">
          {loading ? <p>Loading...</p> : events.map(renderEvent)}
        </div>
        <div className="flex flex-row-reverse mt-3">
          {/* TODO: Update link after implement this page */}
          <Link href="https://www.ssw.com.au/ssw/Events/?tech=all&type=all">
            <a className="inline-flex items-center border-2 border-gray-300 bg-white px-3 py-2 text-xs font-normal leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              More Events
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

const renderEvent = (e: Event) => {
  const isExternalLink =
    !e.Url.Url.includes("ssw.com.au") || e.Url.Url.includes("/ssw/redirect");

  return (
    <article key={e.Id} className="flex py-4">
      <figure className="flex items-center min-w-fit">
        <Link href={e.Thumbnail.Url}>
          <a>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={e.Thumbnail.Url}
              alt="event logo"
              width={75}
              height={75}
            />
          </a>
        </Link>
      </figure>
      <div className="flex flex-col justify-center ml-5">
        <time className="uppercase text-xs">
          <span>
            {e.FormattedDate}
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-700 ml-2 px-1.5 text-xs font-bold text-white">
            {e.RelativeDate}
          </span>      
        </time>
        <h5>
          <Link href={e.Url.Url}>
            <a className="text-sswRed text-sm" target={isExternalLink ? "_blank" : "_self"}>{e.Title}</a>
          </Link>
        </h5>
        {!!e.Presenter && <span className="text-xs whitespace-nowrap">{e.Presenter}</span>}
      </div>
    </article>
  );
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

export const upcomingEventsBlockSchema: Template = {
  name: "UpcomingEvents",
  label: "Upcoming Events",
  ui: {
    previewSrc: "/blocks/content.png",
    defaultItem: {
      title: "Upcoming Events",
      numberOfEvents: 30,
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "number",
      label: "Number of Events",
      name: "numberOfEvents",
    },
  ],
};
