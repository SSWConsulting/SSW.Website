import { EventTrimmed } from "@/components/filter/events";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFetchEvents = (
  initialData: EventTrimmed[]
): { events: EventTrimmed[] } => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axios.get<EventTrimmed[]>("/api/get-upcoming-events", {
        params: { top: 20 },
      });

      return res.data;
    },
    initialData,
  });

  return { events };
};

export const useFetchPastEvents = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["pastEvents"],
    queryFn: async () => {
      const res = await fetch(`/api/get-past-events?top=${100}`);
      const data: EventTrimmed[] = await res.json();

      return data;
    },
  });

  return { pastEvents: data, isLoading };
};
