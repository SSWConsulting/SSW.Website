import { TinaClient } from "@/app/tina-client";
import { getSEOProps } from "@/lib/seo";
import {
  convertEventDatesToStrings,
  getNextEventToBeLiveStreamed,
} from "@/services/server/events";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import LivePage from ".";

const getData = async () => {
  const tinaProps = await fetchTinaData(
    client.queries.liveContentQuery,
    "index"
  );

  const event = await getNextEventToBeLiveStreamed();
  const eventWithStaticProperties = convertEventDatesToStrings(event);

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo: tinaProps.data.live.seo,
      event: eventWithStaticProperties || null,
      header: {
        url: tinaProps.data.global.header.url,
      },
      ...tinaProps,
    },
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const { props } = await getData();
  const seo = props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${props.header.url}live`;
  }

  return getSEOProps(seo);
}

export default async function Live() {
  const { props } = await getData();
  return <TinaClient props={props} Component={LivePage} />;
}
