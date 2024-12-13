import { Metadata } from "next";
import { TinaClient } from "../tina-client";

import { TODAY } from "@/hooks/useFetchEvents";
import { useSEO } from "@/hooks/useSeo";
import client from "@/tina/client";
import EmploymentPage from "./";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getData();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(data);
  return seoProps;
}

const getData = async () => {
  const tinaProps = await client.queries.employmentPageQuery({
    relativePath: "index.mdx",
    date: TODAY.toISOString(),
  });

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
