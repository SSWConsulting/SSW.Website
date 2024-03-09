import { EventTrimmed } from "@/components/filter/events";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchEvents = (
  initialData: EventTrimmed[]
): { events: EventTrimmed[] } => {
  const { data } = useInfiniteQuery({
    queryKey: ["events"],
    queryFn: async ({ pageParam = 0 }) => {
      const res = await axios.get<EventTrimmed[]>("/api/get-upcoming-events", {
        params: { top: 5 },
      });

      return res.data;
    },
    // @ts-expect-error not sure why this isn't listed in the types
    initialData,
    getNextPageParam: (lastPage) => {
      if (lastPage.length < 5) {
        return undefined;
      }

      return lastPage[lastPage.length - 1].StartDateTime;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage[0].StartDateTime;
    },
  });

  return { events: data.pages[0] };
};

export const useFetchPastEvents = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["pastEvents"],
    queryFn: async () => {
      const res = await fetch(`/api/get-past-events?top=${5}`);
      const data: EventTrimmed[] = await res.json();

      return data;
    },
  });

  return { pastEvents: data, isLoading };
};
