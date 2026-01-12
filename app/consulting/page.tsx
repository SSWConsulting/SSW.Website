import client from "@/tina/client";
import { TinaClient } from "app/tina-client";

import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import { Metadata } from "next";
import ConsultingIndex from "./index";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.props.seo;

  return getSEOProps(seo);
}

const getData = async () => {
  const tinaProps = await fetchTinaData(client.queries.consultingIndexQuery);

  const seo = tinaProps.data.consultingIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = new URL(
      "/consulting",
      tinaProps.data.global.header.url
    ).toString();
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      header: {
        url: tinaProps.data.global.header.url,
      },
      variables: tinaProps.variables,
      seo,
    },
  };
};

export default async function Index() {
  const { props } = await getData();
  return <TinaClient props={props} Component={ConsultingIndex} />;
}
