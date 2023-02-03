import React, { useEffect, useState } from "react";
import type { Template } from "tinacms";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isBetween from "dayjs/plugin/isBetween";
import relativeTime from "dayjs/plugin/relativeTime";
import { Event } from "../../classes/event";

import Link from "next/link";
import Image from "next/image";

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(relativeTime);

export const UpcomingEvents = ({ data }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      const datetime = dayjs.utc().startOf("day").format("YYYY-MM-DDTHH:mm:ss[Z]"); //Why
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
        "https://www.ssw.com.au/ssw/SharePointEventsService.aspx",
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
    <div className="prose">
      <h1 className="pb-5 font-light">{data.title}</h1>
      <div className="not-prose">
        <div className="max-h-128 overflow-x-hidden overflow-y-scroll border-2 bg-gray-100">
          {loading ? <p>Loading...</p> : events.map(renderEvent)}
        </div>
        <div className="mt-3 flex flex-row-reverse">
          {/* TODO: Update link after implement this page */}
          <Link
            href="https://www.ssw.com.au/ssw/Events/?tech=all&type=all"
            className="inline-flex items-center border-2 border-gray-300 bg-white px-3 py-2 text-xs font-normal leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2">
            
              More Events
            
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
    <article key={e.Id} className="flex">
      <figure className="flex min-w-fit items-center">
        <Link href={e.Thumbnail.Url}>

          <Image
            src={e.Thumbnail.Url}
            alt="event logo"
            width={75}
            height={75}
          />

        </Link>
      </figure>
      <div className="ml-5 flex flex-col justify-center">
        <time className="text-xs uppercase">
          <span>
            {e.FormattedDate}
          </span>
          <span className="ml-2 inline-flex items-center rounded-md bg-gray-700 px-1.5 text-xs font-bold text-white">
            {e.RelativeDate}
          </span>      
        </time>
        <h5>
          <Link
            href={e.Url.Url}
            className="text-sm text-sswRed"
            target={isExternalLink ? "_blank" : "_self"}>
            {e.Title}
          </Link>
        </h5>
        {!!e.Presenter && <span className="whitespace-nowrap text-xs">{e.Presenter}</span>}
      </div>
    </article>
  );
};

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
