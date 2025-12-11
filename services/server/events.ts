"use server";
import client from "../../tina/__generated__/client";
import { EventInfo } from "./events-types";

/**
 * Querying TinaCMS event data for the next UG event
 *
 * @returns Awaitable EventInfo for the next "User Group" event. If there is no future UG event scheduled then a previous one is returned
 */
export const getNextEventToBeLiveStreamed = async (): Promise<EventInfo> => {
  const currentDate = new Date().toISOString();

  let eventsData = await client.queries.getFutureEventsQuery({
    fromDate: currentDate,
    top: 1,
    calendarType: "User Groups",
  });

  if (eventsData?.data.eventsCalendarConnection.totalCount < 1) {
    eventsData = await client.queries.getPastEventsQuery({
      fromDate: currentDate,
      top: 1,
      calendarType: "User Groups",
    });
  }

  if (eventsData?.data.eventsCalendarConnection.totalCount === 0) return null;

  const event: EventInfo =
    eventsData?.data.eventsCalendarConnection.edges.map((edge) => ({
      ...edge.node,
      startDateTime: new Date(edge.node.startDateTime),
      endDateTime: new Date(edge.node.endDateTime),
      startShowBannerDateTime: new Date(edge.node.startShowBannerDateTime),
      endShowBannerDateTime: new Date(edge.node.endShowBannerDateTime),
    }))[0] ?? null;

  return event;
};
