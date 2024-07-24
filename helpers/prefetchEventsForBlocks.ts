import client from "@/tina/client";

export const UPCOMING_EVENTS_TYPE = "UpcomingEvents";

export const prefetchEventsForBlocks = async (blocks: string[], dataSource) => {
  let eventsMap = {};
  await Promise.all(
    blocks.map(async (element) => {
      if (dataSource[element]) {
        await Promise.all(
          dataSource[element].map(async (blockElement, i) => {
            const typename = blockElement.__typename;
            if (typename.endsWith(UPCOMING_EVENTS_TYPE)) {
              if (!eventsMap[typename]) {
                eventsMap[typename] = [];
              }
              const prefetchedEvents = await getFiniteEvents(
                blockElement.numberOfEvents
              );
              eventsMap[typename][i] = prefetchedEvents;
            }
          })
        );
      }
    })
  );
  return eventsMap;
};

const getFiniteEvents = async (numberOfEvents) => {
  const res = await client.queries.getFutureEventsQuery({
    fromDate: new Date().toISOString(),
    top: numberOfEvents,
  });
  return res.data.eventsCalendarConnection.edges.map((event) => ({
    ...event.node,
    startDateTime: new Date(event.node.startDateTime).toISOString(),
    endDateTime: new Date(event.node.endDateTime).toISOString(),
  }));
};
