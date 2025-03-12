import client from "@/tina/client";
import { TinaClient } from "app/tina-client";

import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import PartnerIndex from "./index";

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}company/partners`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo || {});

  return { ...seoProps };
}

const getData = async () => {
  const tinaProps = await client.queries.partnerIndexQuery({
    date: TODAY.toISOString(),
  });

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
