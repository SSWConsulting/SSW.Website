import client from "@/tina/client";
import { useRouter } from "next/router";
import type { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Blocks } from "../../components/blocks-renderer";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { EventsFilter } from "../../components/filter/events";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

const ISR_TIME = 60 * 60; // 1 hour

const EVENT_PAGE_SIZE = 10;

export default function EventsIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const router = useRouter();
  const defaultToPastTab =
    new URLSearchParams(router.asPath.split(/\?/)[1]).get("past") === "1";

  return (
    <>
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
            sidebarBody={data.eventsIndex.sidebarBody}
            defaultToPastTab={defaultToPastTab}
            events={props.events}
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

  const pastEvents = await client.queries.getPastEventsQuery({
    fromDate: startOfDay.toISOString(),
    top: EVENT_PAGE_SIZE,
  });

  const futureEvents = await client.queries.getFutureEventsQuery({
    fromDate: startOfDay.toISOString(),
    top: EVENT_PAGE_SIZE,
  });

  if (!tinaProps.data.eventsIndex.seo.canonical) {
    tinaProps.data.eventsIndex.seo.canonical = `${tinaProps.data.global.header.url}events`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      events: { futureEvents: futureEvents.data, pastEvents: pastEvents.data },
    },
    revalidate: ISR_TIME,
  };
};
