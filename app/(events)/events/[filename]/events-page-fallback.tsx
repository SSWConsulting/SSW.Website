"use client";

import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import {
  getTestimonialCategories,
  getVideoCardProps,
} from "@/services/server/events";
import client from "@/tina/client";
import EventsPage from "./events";

const EventsPageFallback = ({
  tinaProps,
}: {
  tinaProps: Awaited<ReturnType<typeof client.queries.eventsContentQuery>>;
}) => {
  const categories = getTestimonialCategories(tinaProps.data.events);

  const videoCardProps = getVideoCardProps(tinaProps.data.events);

  const testimonialsResult = getTestimonialsByCategories(categories);

  return (
    <>
      <h1>Events page fallback</h1>
      <EventsPage
        tinaProps={tinaProps}
        props={{ videoCardProps, testimonialsResult }}
      />
      ;
    </>
  );
};

export default EventsPageFallback;
