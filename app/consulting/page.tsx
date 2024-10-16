import client from "@/tina/client";
import { TinaClient } from "app/tina-client";

import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import ConsultingIndex from "./index";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}/consulting`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

const getData = async () => {
  const tinaProps = await client.queries.consultingIndexQuery({
    date: TODAY.toISOString(),
  });

  const seo = tinaProps.data.consultingIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}/consulting`;
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
