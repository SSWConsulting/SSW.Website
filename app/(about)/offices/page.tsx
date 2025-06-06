import { TinaClient } from "@/app/tina-client";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import OfficesPage from ".";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.data.global.header.url}offices`;
  }

  return getSEOProps(seo);
}

const getData = async () => {
  const tinaProps = await fetchTinaData(
    client.queries.officeIndexQuery,
    "officesIndex",
    FileType.JSON
  );

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo: tinaProps.data.officeIndex.seo,
      header: {
        url: tinaProps.data.global.header.url,
      },
    },
  };
};

export default async function Offices() {
  const { props } = await getData();
  return <TinaClient props={props} Component={OfficesPage} />;
}
