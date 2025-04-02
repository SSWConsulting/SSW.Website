import { TinaClient } from "@/app/tina-client";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import IndustryPage from ".";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.data.global.header.url}industry`;
  }

  return getSEOProps(seo);
}

const getData = async () => {
  const tinaProps = await fetchTinaData(client.queries.industryIndexQuery);

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo: tinaProps.data.industryIndex.seo,
    },
  };
};

export default async function Industries() {
  const { props } = await getData();
  return <TinaClient props={props} Component={IndustryPage} />;
}
