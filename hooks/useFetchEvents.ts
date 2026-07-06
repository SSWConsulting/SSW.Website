import { getTrimmedEvent } from "@/helpers/getTrimmedEvents";
import { getFutureEvents, getPastEvents } from "@/services/server/events";
import { useInfiniteQuery } from "@tanstack/react-query";

export const FUTURE_EVENTS_QUERY_KEY = "futureEvents";
export const PAST_EVENTS_QUERY_KEY = "pastEvents";

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
    futureEvents: getTrimmedEvent(data),
    error,
    isLoadingFuturePages: isLoading,
    fetchFutureNextPage: fetchNextPage,
    isFetchingFuturePages: isFetchingNextPage,
    hasMoreFuturePages:
      data?.pages[data?.pages.length - 1].eventsCalendarConnection.pageInfo
        .hasNextPage,
  };
};

// getPastEvents is now imported from services/server/events

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
    pastEvents: getTrimmedEvent(data),
    error,
    isLoadingPastPages: isLoading,
    fetchNextPastPage: fetchNextPage,
    isFetchingPastPages: isFetchingNextPage,
    hasMorePastPages:
      data?.pages[data?.pages.length - 1].eventsCalendarConnection.pageInfo
        .hasPreviousPage,
  };
};

// getEventsCategories is now imported from services/server/events

export type EventCategories = {
  [key: string]: number;
};
