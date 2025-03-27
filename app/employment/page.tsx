import { TinaClient } from "@/app/tina-client";
import { Metadata } from "next";

import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import EmploymentPage from "./";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  return getSEOProps(data.props.seo);
}

const getData = async () => {
  const tinaProps = await fetchTinaData(
    client.queries.employmentPageQuery,
    "index"
  );

  const seo = tinaProps.data.employment.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}employment`;
  }

  const marketingSection = await client.queries.marketing({
    relativePath: "/dressing-down.mdx",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      marketingData: marketingSection.data,
      seo,
    },
  };
};

const Employment = async () => {
  const data = await getData();
  return <TinaClient props={data.props} Component={EmploymentPage} />;
};

export default Employment;
