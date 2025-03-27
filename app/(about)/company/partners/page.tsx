import client from "@/tina/client";
import { TinaClient } from "app/tina-client";

import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import { TODAY } from "hooks/useFetchEvents";
import { Metadata } from "next";
import PartnerIndex from "./index";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}company/partners`;
  }

  return getSEOProps(seo);
}

const getData = async () => {
  const tinaProps = await fetchTinaData(
    client.queries.partnerIndexQuery,
    TODAY.toISOString()
  );

  const seo = tinaProps.data.partnerIndex.seo;

  return {
    props: {
      ...tinaProps,
      header: {
        url: tinaProps.data.global.header.url,
      },
      seo,
    },
  };
};

export default async function Index() {
  const { props } = await getData();
  return <TinaClient props={props} Component={PartnerIndex} />;
}
