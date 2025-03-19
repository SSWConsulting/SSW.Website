import { useSEO } from "@/hooks/useSeo";
import {
  convertEventDatesToStrings,
  getNextEventToBeLiveStreamed,
} from "@/services/server/events";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import LivePage from ".";
import { TinaClient } from "../tina-client";

export const revalidate = 3600; // 1 hour

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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return { ...seoProps };
}

export default async function Live() {
  const { props } = await getData();
  return <TinaClient props={props} Component={LivePage} />;
}
