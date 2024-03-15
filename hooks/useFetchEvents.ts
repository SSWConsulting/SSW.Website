import { EventTrimmed } from "@/components/filter/events";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LENGTH = 10;
const PAST_PAGE_LENGTH = 10;

export const getEvents = async ({ pageParam = 1 }) => {
  const res = await axios.get<EventTrimmed[]>("/api/get-upcoming-events", {
    params: { top: PAGE_LENGTH, page: pageParam },
  });

  return res.data;
};

const getPastEvents = async ({ pageParam = 1 }) => {
  const res = await axios.get<EventTrimmed[]>("/api/get-past-events", {
    params: { top: PAST_PAGE_LENGTH, page: pageParam },
  });

  return res.data;
};

export const useFetchEvents = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return (allPages?.length || 1) + 1;
    },
  });

  return {
    events: data?.pages.flat() || [],
    fetchNextPage,
    isFetchingNextPage,
  };
};

export const useFetchPastEvents = (enabled: boolean) => {
  const { data, isLoading, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["pastEvents"],
      queryFn: getPastEvents,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return (allPages?.length || 1) + 1;
      },
      enabled,
    });

  return {
    pastEvents: data?.pages.flat() || [],
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  };
};
