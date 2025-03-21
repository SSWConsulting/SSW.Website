import client from "@/tina/client";

import { fetchTinaData } from "@/services/tina/fetchTinaData";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { TinaClient } from "app/tina-client";
import {
  FUTURE_EVENTS_QUERY_KEY,
  getEventsCategories,
  getFutureEvents,
  getPastEvents,
  PAST_EVENTS_QUERY_KEY,
} from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import EventIndex from "./index";

export const revalidate = 3600;

export async function generateStaticParams() {
  return [];
}

const DEFAULT_FILTERS = "undefinedundefined";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}events`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

const getData = async () => {
  const tinaProps = await fetchTinaData(
    client.queries.eventsIndexContentQuery,
    "index"
  );

  const queryClient = new QueryClient();

  const seo = tinaProps.data.eventsIndex.seo;

  const filterCategories = await getEventsCategories();

  // Default filters are set to undefined on initial load to prevent losing the prefetched cache.
  // This avoids extra load time on the client side.
  const intialCachedQueryForFutureEvent =
    FUTURE_EVENTS_QUERY_KEY + DEFAULT_FILTERS;
  const intialCachedQueryForPastEvents =
    PAST_EVENTS_QUERY_KEY + DEFAULT_FILTERS;

  await queryClient.prefetchInfiniteQuery({
    /* values of undefined cannot be serialized as JSON, so were passing the values as strings
      using concatenation */
    queryKey: [intialCachedQueryForFutureEvent],
    queryFn: () => getFutureEvents(),
    initialPageParam: "",
  });

  await queryClient.prefetchInfiniteQuery({
    /* values of undefined cannot be serialized as JSON, so were passing the values as strings
      using concatenation */
    queryKey: [intialCachedQueryForPastEvents],
    queryFn: () => getPastEvents(),
    initialPageParam: "",
  });

  if (!tinaProps.data.eventsIndex.seo.canonical) {
    tinaProps.data.eventsIndex.seo.canonical = `${tinaProps.data.global.header.url}events`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      filterCategories,
      dehydratedState: dehydrate(queryClient),
      header: {
        url: tinaProps.data.global.header.url,
      },
      seo,
    },
  };
};

export default async function EventPage() {
  const { props } = await getData();

  return <TinaClient props={props} Component={EventIndex} />;
}
