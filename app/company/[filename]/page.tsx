import { HistoryTimelineCardProps } from "@/components/company/historyTimelineCard";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { TinaClient } from "../../tina-client";
import CompanyPage from "./index";

export const revalidate = 3600; // 1 hour

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.companyContentQuery,
    filename
  );

  const seo = tinaProps.data.company.seo;

  const historyCardProps =
    tinaProps.data?.company?.historyCards?.map<HistoryTimelineCardProps>(
      (m) => ({
        year: m.year,
        title: m.title,
        location: m.location as HistoryTimelineCardProps["location"],
        description: m.description,
      })
    ) || [];

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      header: {
        url: tinaProps.data.global.header.url,
      },
      historyCardProps: historyCardProps,
      seo,
      ...tinaProps,
    },
  };
};

type GenerateMetaDataProps = {
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}company/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Consulting({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;

  const { props } = await getData(filename);

  return <TinaClient props={props} Component={CompanyPage} />;
}
