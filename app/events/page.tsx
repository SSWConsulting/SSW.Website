import client from "@/tina/client";
import { TinaClient } from "app/tina-client";

import { QueryProvider } from "app/providers/query-provider";
import { TODAY } from "hooks/useFetchEvents";
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

  const seo = tinaProps.data.eventsIndex.seo;

  if (!tinaProps.data.eventsIndex.seo.canonical) {
    tinaProps.data.eventsIndex.seo.canonical = `${tinaProps.data.global.header.url}events`;
  }

  const futureEventsData = await client.queries.getFutureEventsQuery({
    fromDate: TODAY.toISOString(),
    top: 10,
  });
  const pastEventsData = await client.queries.getPastEventsQuery({
    fromDate: TODAY.toISOString(),
    top: 10,
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      futureEventsData: futureEventsData.data,
      pastEventsData: pastEventsData.data,
      variables: tinaProps.variables,
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
    <QueryProvider>
      <TinaClient props={props} Component={EventIndex} />
    </QueryProvider>
  );
}
