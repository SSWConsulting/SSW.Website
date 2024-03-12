import { EventTrimmed } from "@/components/filter/events";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const PAGE_LENGTH = 5;

const getEvents = async ({ pageParam = 1 }) => {
  const res = await axios.get<EventTrimmed[]>("/api/get-upcoming-events", {
    params: { top: PAGE_LENGTH, page: pageParam },
  });

  return res.data;
};

export const useFetchEvents = (initialData: EventTrimmed[]) => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: getEvents,
    initialData: { pages: [initialData], pageParams: [1] },
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
  const { data, isLoading } = useQuery({
    queryKey: ["pastEvents"],
    queryFn: async () => {
      const res = await fetch(`/api/get-past-events?top=${5}`);
      const data: EventTrimmed[] = await res.json();

      return data;
    },
    enabled,
  });

  return { pastEvents: data, isLoading };
};
