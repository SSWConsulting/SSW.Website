import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import { EVENTS_QUERY_KEY } from "hooks/useFetchEvents";
import type { InferGetStaticPropsType } from "next";
import { getEvents } from "services/server/events";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { Blocks } from "../../components/blocks-renderer";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { EventTrimmed, EventsFilter } from "../../components/filter/events";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

const ISR_TIME = 60 * 60; // 1 hour

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <HydrationBoundary state={props.dehydratedState}>
      <SEO seo={data.eventsIndex.seo} />
      <Layout menu={data.megamenu}>
        <Container size="small">
          <div>
            <h1 className="mt-0 pt-0">SSW Events</h1>
            <TinaMarkdown
              content={data.eventsIndex._body}
              components={componentRenderer}
            />
          </div>
          <EventsFilter sidebarBody={data.eventsIndex.sidebarBody} />
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
  const tinaProps = await client.queries.eventsIndexContentQuery({
    relativePath: "index.mdx",
  });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const fields =
    "Title,Thumbnail,StartDateTime,EndDateTime,City,Url,Presenter,PresenterProfileUrl,CalendarType,Category_f5a9cf4c_x002d_8228_x00,EventShortDescription";

  const odataFilter = `$select=id&$expand=fields($select=${fields})&$filter=fields/Enabled ne false \
      and fields/EndDateTime gt '${startOfDay.toISOString()}'\
      &$orderby=fields/StartDateTime asc\
      &$top=${10}`;

  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchInfiniteQuery({
      queryKey: [EVENTS_QUERY_KEY],
      queryFn: async ({ pageParam = 1 }) => {
        const events = await getEvents(odataFilter, pageParam);
        return events as EventTrimmed[];
      },
      initialPageParam: 1,
    });
  } catch (err) {
    const properties = {
      Request: "GET /events",
      Status: 500,
      FailedSharePointRequest: false,
    };

    if (err instanceof AxiosError) {
      // eslint-disable-next-line no-console
      console.error(err.response.data);
      properties.Status = err.response.status;
      properties.FailedSharePointRequest = true;
    }

    appInsights.defaultClient.trackException({
      exception: err,
      properties,
      severity: appInsights.Contracts.SeverityLevel.Error,
    });
  }

  if (!tinaProps.data.eventsIndex.seo.canonical) {
    tinaProps.data.eventsIndex.seo.canonical = `${tinaProps.data.global.header.url}events`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: ISR_TIME,
  };
};
