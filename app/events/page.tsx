import client from "@/tina/client";

import {
  DEFAULT_CATEGORY_FILTER,
  DEFAULT_TECHNOLOGY_FITLER,
} from "@/components/filter/events";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { TinaClient } from "app/tina-client";
import {
  FUTURE_EVENTS_QUERY_KEY,
  getEventsCategories,
  getFutureEvents,
  TODAY,
} from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import EventIndex from "./index";

export const revalidate = 3600;

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
  const tinaProps = await client.queries.eventsIndexContentQuery({
    relativePath: "index.mdx",
    date: TODAY.toISOString(),
  });

  const queryClient = new QueryClient();

  const seo = tinaProps.data.eventsIndex.seo;

  const filterCategories = await getEventsCategories();

  await queryClient.prefetchInfiniteQuery({
    /* values of undefined cannot be serialized as JSON, so were passing the values as strings
      using concatenation */
    queryKey: [
      FUTURE_EVENTS_QUERY_KEY +
        DEFAULT_TECHNOLOGY_FITLER +
        DEFAULT_CATEGORY_FILTER,
    ],
    queryFn: () => getFutureEvents(),
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

  return (
    <HydrationBoundary state={props.dehydratedState}>
      <TinaClient props={props} Component={EventIndex} />
    </HydrationBoundary>
  );
}
