import client from "@/tina/client";
import { GetPastEventsQueryQuery } from "@/tina/types";
import type { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Blocks } from "../../components/blocks-renderer";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import {
  DEFAULT_CATEGORY_FILTER,
  DEFAULT_TECHNOLOGY_FITLER,
  EventsFilter,
} from "../../components/filter/events";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

import { EventFilterAllCategories } from "@/components/filter/FilterBlock";
import { getPastEvents } from "@/services/server/getEvents";
import { EventsCalendarConnectionEdges } from "@/tina/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  FUTURE_EVENTS_QUERY_KEY,
  getFutureEvents,
} from "../../hooks/useFetchEvents";

const ISR_TIME = 60 * 60; // 1 hour

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { query, variables, filterCategories } = props;
  const { data } = useTina({
    data: props.data,
    query,
    variables,
  });

  const router = useRouter();
  const defaultToPastTab =
    new URLSearchParams(router.asPath.split(/\?/)[1]).get("past") === "1";

  return (
    <HydrationBoundary state={props.dehydratedState}>
      <SEO seo={data.eventsIndex.seo} />
      <Layout menu={data.megamenu}>
        <Container size="small">
          <div className="md:flex md:flex-row">
            <h1 className="md:mr-12 md:shrink-0 md:basis-64">SSW Events</h1>
            <div className="mt-5 min-w-0 max-w-full shrink grow overflow-auto whitespace-normal break-all pb-1 pt-15 md:mr-12 md:shrink-0 md:basis-64">
              <TinaMarkdown
                content={data.eventsIndex.preface}
                components={componentRenderer}
              />
            </div>
          </div>
          <EventsFilter
            filterCategories={filterCategories}
            sidebarBody={data.eventsIndex.sidebarBody}
            defaultToPastTab={defaultToPastTab}
          />
        </Container>
        <Blocks
          prefix="EventsIndexAfterEvents"
          blocks={data.eventsIndex.afterEvents}
        />
      </Layout>
    </HydrationBoundary>
  );
}

export const getStaticProps = async () => {
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

  const category = "calendarType";

  const technology = "category";

  const filterCategories: EventFilterAllCategories = {
    past: {
      technologies: aggregateByCategory(pastEvents.data, technology),
      categories: aggregateByCategory(pastEvents.data, category),
    },
    upcoming: {
      technologies: aggregateByCategory(upcomingEvents.data, technology),
      categories: aggregateByCategory(upcomingEvents.data, category),
    },
  };

  const tinaProps = await client.queries.eventsIndexContentQuery({
    relativePath: "index.mdx",
  });

  const queryClient = new QueryClient();

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
    },
    revalidate: ISR_TIME,
  };
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
