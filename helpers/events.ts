import { VideoCardType } from "@/components/util/videoCards";
import client from "@/tina/client";

type EventsRespose = Awaited<
  ReturnType<typeof client.queries.eventsContentQuery>
>;

type EventsData = EventsRespose["data"]["events"];

export const getTestimonialCategories = (events: EventsData): string[] => {
  return (
    events.testimonialCategories?.map(
      (category) => category.testimonialCategory.name
    ) || []
  );
};

export const getVideoCardProps = (events: EventsData): VideoCardType[] => {
  return (
    events.videos?.videoCards?.map<VideoCardType>((m) => ({
      title: m.title,
      link: m.link,
    })) || []
  );
};
