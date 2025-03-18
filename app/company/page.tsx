import client from "@/tina/client";
import { TinaClient } from "app/tina-client";

import { CompanyIndexProps } from "@/components/company/companyPageCard";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import CompanyIndex from "./index";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}company`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

const getData = async () => {
  const tinaProps = await fetchTinaData(
    client.queries.companyIndexContentQuery,
    "index"
  );

  const seo = tinaProps.data.companyIndex.seo;

  const companyPageProps =
    tinaProps.data.companyIndex?.companyPages?.map<CompanyIndexProps>((m) => ({
      title: m.title,
      body: m.body,
      pageURL: m.pageURL,
      isExternal: m.isExternal,
    })) || [];

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      header: {
        url: tinaProps.data.global.header.url,
      },
      variables: tinaProps.variables,
      seo,
      companyPageProps,
    },
  };
};

export default async function Index() {
  const { props } = await getData();
  return <TinaClient props={props} Component={CompanyIndex} />;
}
