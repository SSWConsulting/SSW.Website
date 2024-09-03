import { useInfiniteQuery } from "@tanstack/react-query";
import client from "../tina/__generated__/client";

const PAGE_LENGTH = 10;

export const FUTURE_EVENTS_QUERY_KEY = "futureEvents";
export const PAST_EVENTS_QUERY_KEY = "pastEvents";

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

export const getFutureEvents = async (
  pageParam?: string,
  category?: string,
  calendarType?: string
) => {
  const res = await client.queries.getFutureEventsQuery({
    fromDate: TODAY.toISOString(),
    top: PAGE_LENGTH,
    after: pageParam,
    category: category,
    calendarType: calendarType,
  });

  console.log(res.data);
  return res.data;
};

export type SelectedCategories = {
  technology: string;
  category: string;
};

export const useFetchFutureEvents = (filters: SelectedCategories) => {
  const { data, fetchNextPage, isFetchingNextPage, error, isLoading } =
    useInfiniteQuery({
      queryKey: [
        FUTURE_EVENTS_QUERY_KEY + filters.technology + filters.category,
      ],
      queryFn: ({ pageParam }) =>
        getFutureEvents(pageParam, filters.technology, filters.category),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        return lastPage.eventsCalendarConnection.pageInfo.endCursor;
      },
    });

  return {
    futureEvents:
      data?.pages.flat().flatMap((item) =>
        item.eventsCalendarConnection.edges.map((edge) => ({
          ...edge.node,
          startDateTime: new Date(edge.node.startDateTime),
          endDateTime: new Date(edge.node.endDateTime),
        }))
      ) || [],
    error,
    isLoadingFuturePages: isLoading,
    fetchFutureNextPage: fetchNextPage,
    isFetchingFuturePages: isFetchingNextPage,
    hasMoreFuturePages:
      data?.pages[data?.pages.length - 1].eventsCalendarConnection.pageInfo
        .hasNextPage,
  };
};

const getPastEvents = async (
  pageParam: string,
  category: string = undefined,
  calendarType: string = undefined
) => {
  const res = await client.queries.getPastEventsQuery({
    fromDate: TODAY.toISOString(),
    top: PAGE_LENGTH,
    before: pageParam,
    category: category,
    calendarType: calendarType,
  });
  return res.data;
};

export const useFetchPastEvents = (filters: SelectedCategories) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage, error } =
    useInfiniteQuery({
      queryKey: [PAST_EVENTS_QUERY_KEY + filters.technology + filters.category],
      queryFn: ({ pageParam }) =>
        getPastEvents(pageParam, filters.technology, filters.category),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        return lastPage.eventsCalendarConnection.pageInfo.endCursor;
      },
    });

  return {
    pastEvents:
      data?.pages.flat().flatMap((item) =>
        item.eventsCalendarConnection.edges.map((edge) => ({
          ...edge.node,
          startDateTime: new Date(edge.node.startDateTime),
          endDateTime: new Date(edge.node.endDateTime),
        }))
      ) || [],
    error,
    isLoadingPastPages: isLoading,
    fetchNextPastPage: fetchNextPage,
    isFetchingPastPages: isFetchingNextPage,
    hasMorePastPages:
      data?.pages[data?.pages.length - 1].eventsCalendarConnection.pageInfo
        .hasPreviousPage,
  };
};
