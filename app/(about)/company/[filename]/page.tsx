import { HistoryTimelineCardProps } from "@/components/company/historyTimelineCard";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import { TinaClient } from "../../../tina-client";
import CompanyPage from "./index";

export async function generateStaticParams() {
  let pageListData = await client.queries.companyConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.companyConnection.pageInfo.hasNextPage) {
    const lastCursor = pageListData.data.companyConnection.pageInfo.endCursor;
    pageListData = await client.queries.companyConnection({
      after: lastCursor,
    });

    allPagesListData.data.companyConnection.edges.push(
      ...pageListData.data.companyConnection.edges
    );
  }

  const pages = allPagesListData.data.companyConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  return pages;
}

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
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props0: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await props0.params;
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}company/${params.filename}`;
  }

  return getSEOProps(seo);
}

export default async function Consulting(props0: {
  params: Promise<{ filename: string }>;
}) {
  const params = await props0.params;
  const { filename } = params;

  const { props } = await getData(filename);

  return <TinaClient props={props} Component={CompanyPage} />;
}
