import * as appInsights from "applicationinsights";
import { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";
import client from "../../.tina/__generated__/client";

import { AxiosError } from "axios";
import { Blocks } from "../../components/blocks-renderer";
import { EventsFilter } from "../../components/filter/events";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";
import { getEvents } from "../../services/server/events";

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <>
      <SEO seo={data.eventsIndex.seo} />
      <Layout>
        <Container>
          <EventsFilter
            events={props.events}
            pastEvents={props.pastEvents}
            sidebarBody={data.eventsIndex.sidebarBody}
          />
        </Container>
        <Blocks
          prefix="EventsIndexAfterEvents"
          blocks={data.eventsIndex.afterEvents}
        />
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.eventsIndexContentQuery({
    relativePath: "index.mdx",
  });

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const odataFilter = `$filter=fields/Enabled ne false \
      and fields/EndDateTime gt '${startOfDay.toISOString()}'\
      &$orderby=fields/StartDateTime asc\
      &$top=${15}`;

  const pastOdataFilter = `$filter=fields/Enabled ne false \
      and fields/StartDateTime lt '${startOfDay.toISOString()}'\
      &$orderby=fields/StartDateTime desc\
      &$top=${100}`;

  let events, pastEvents;
  try {
    events = await getEvents(odataFilter);
    pastEvents = await getEvents(pastOdataFilter);
  } catch (err) {
    const properties = {
      Request: "GET /events",
      Status: 500,
      FailedSharePointRequest: false,
    };

    if (err instanceof AxiosError) {
      console.error(err.response.data);
      properties.Status = err.response.status;
      properties.FailedSharePointRequest = true;
    }

    appInsights.defaultClient.trackException({
      exception: err,
      properties,
      severity: appInsights.Contracts.SeverityLevel.Error,
    });

    console.error(err);

    events = [];
    pastEvents = [];
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      events,
      pastEvents,
    },
    revalidate: 60 * 60,
  };
};
