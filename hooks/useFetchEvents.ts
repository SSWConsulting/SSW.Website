import { EventFilterAllCategories } from "@/components/filter/FilterBlock";
import {
  EventsCalendarConnectionEdges,
  GetFutureEventsQueryQuery,
  GetPastEventsQueryQuery,
} from "@/tina/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import client from "../tina/__generated__/client";

const PAGE_LENGTH = 10;

export const FUTURE_EVENTS_QUERY_KEY = "futureEvents";
export const PAST_EVENTS_QUERY_KEY = "pastEvents";

const getCategoriesForFilter = (category: string) => {
  if (!category) return undefined;
  const categories = {
    "Angular and React": ["Angular and React", "Angular", "React"],
    Mobile: ["Mobile Development", "Mobile"],
    "Mobile Development": ["Mobile Development", "Mobile"],
    Other: ["Other", "Non-English Courses"],
  };
  const lookup = categories[category];

  return lookup ? lookup : [category];
};

const formatCategory = (category: string): string => {
  {
    console.log("category", category);
    const categoryReplacements = {
      "Non-English Courses": "Other",
    };
    const lookup = categoryReplacements[category];
    if (lookup) console.log("lookup", lookup);

    return lookup ? lookup : category;
  }
};

const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

export const getFutureEvents = async (
  pageParam?: string,
  category?: string,
  calendarType?: string
) => {
  const categories = getCategoriesForFilter(category);
  const res = await client.queries.getFutureEventsQuery({
    fromDate: TODAY.toISOString(),
    top: PAGE_LENGTH,
    after: pageParam,
    categories,
    calendarType,
  });
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
          category: formatCategory(edge.node.category),
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
  const categories = getCategoriesForFilter(category);
  const res = await client.queries.getPastEventsQuery({
    fromDate: TODAY.toISOString(),
    top: PAGE_LENGTH,
    before: pageParam,
    categories,
    calendarType,
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
          category: formatCategory(edge.node.category),
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

export const getEventsCategories = async () => {
  const today: string = new Date().toISOString();
  const limit: number = 9999;

  const pastEvents = await client.queries.getPastEventsQuery({
    fromDate: today,
    top: limit,
  });
  const upcomingEvents = await client.queries.getFutureEventsQuery({
    fromDate: today,
    top: limit,
  });
  const upcomingEventsData = upcomingEvents.data;

  const pastEventsData = pastEvents.data;

  formatCategories(upcomingEventsData.eventsCalendarConnection.edges);
  formatCategories(pastEventsData.eventsCalendarConnection.edges);
  const category = "calendarType";

  const technology = "category";

  const filterCategories: EventFilterAllCategories = {
    past: {
      technologies: aggregateByCategory(pastEventsData, technology),
      categories: aggregateByCategory(pastEvents.data, category),
    },
    upcoming: {
      technologies: aggregateByCategory(upcomingEvents.data, technology),
      categories: aggregateByCategory(upcomingEvents.data, category),
    },
  };
  return filterCategories;
};

const aggregateByCategory = (
  events: GetPastEventsQueryQuery,
  targetCategory: string
): EventCategories => {
  return events.eventsCalendarConnection.edges.reduce((occurences, event) => {
    const category = event.node[targetCategory];
    if (occurences[category]) {
      occurences[category]++;
    } else {
      occurences[category] = 1;
    }
    return occurences;
  }, {});
};

export type EventCategories = {
  [key: string]: number;
};

const formatCategories = (edges) => {
  for (let i = 0; i < edges.length; i++) {
    edges[i] = {
      ...edges[i],
      node: {
        ...edges[i].node,
        category: formatCategory(edges[i].node.category),
      },
    };
  }
};
