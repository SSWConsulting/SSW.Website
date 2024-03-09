import * as appInsights from "applicationinsights";
import { AxiosError } from "axios";
import { useFetchEvents } from "hooks/useFetchEvents";
import type { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { Blocks } from "../../components/blocks-renderer";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { EventTrimmed, EventsFilter } from "../../components/filter/events";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";
import { getEvents } from "../../services/server/events";

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
    <>
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
          <EventsFilter
            events={props.events}
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

  const fields =
    "Title,Thumbnail,StartDateTime,EndDateTime,City,Url,Presenter,PresenterProfileUrl,CalendarType,Category_f5a9cf4c_x002d_8228_x00,Abstract";

  const odataFilter = `$select=id&$expand=fields($select=${fields})&$filter=fields/Enabled ne false \
      and fields/EndDateTime gt '${startOfDay.toISOString()}'\
      &$orderby=fields/StartDateTime asc\
      &$top=${20}`;

  let events: EventTrimmed[];
  try {
    events = await getEvents(odataFilter);
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

    events = [];
  }

  if (!tinaProps.data.eventsIndex.seo.canonical) {
    tinaProps.data.eventsIndex.seo.canonical = `${tinaProps.data.global.header.url}events`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      events,
    },
    revalidate: ISR_TIME,
  };
};
