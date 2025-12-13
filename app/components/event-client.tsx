"use client";

import { EventTrimmed } from "@/components/filter/events";
import { getFutureEventsSimple } from "@/services/server/events";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EventsCard } from "../../components/blocks/upcomingEvents";

interface EventImageClientProps {
  thumbnail: string;
  thumbnailDescription: string;
  title: string;
}

export const EventImageClient = ({
  thumbnail,
  thumbnailDescription,
  title,
}: EventImageClientProps) => {
  const [imageFailed, setImageFailed] = useState<boolean>(false);
  return (
    <>
      {!imageFailed && (
        <div className="col-span-1 flex items-center justify-center sm:mr-2 sm:justify-end">
          <Image
            className={"rounded-md"}
            src={thumbnail}
            alt={`${thumbnailDescription || title} logo`}
            width={90}
            height={90}
            sizes="(max-width: 768px) 25vw, 50px"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        </div>
      )}
    </>
  );
};

export const UpcomingEventsClient = ({ data }) => {
  const [events, setEvents] = useState<EventTrimmed[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const events = await getFutureEventsSimple(
        data.numberOfEvents,
        today.toISOString()
      );

      if (!events.data) return;
      const mappedEvents = events.data.eventsCalendarConnection.edges.map(
        (event) => ({
          ...event.node,
          startDateTime: new Date(event.node.startDateTime),
          endDateTime: new Date(event.node.endDateTime),
        })
      );
      setEvents(mappedEvents);
    };

    fetchEvents();
  }, [data.numberOfEvents]);

  return <EventsCard events={events} data={data} />;
};
