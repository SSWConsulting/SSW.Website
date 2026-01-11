import { TinaClient } from "@/app/tina-client";
import ClientFallback from "@/components/client-fallback";
import { HistoryTimelineCardProps } from "@/components/company/historyTimelineCard";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import { cache } from "react";
import CompanyPage from "./index";

export const dynamic = "force-static";

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

const getData = cache(async (filename: string) => {
  return;
  const tinaProps = await fetchTinaData(
    client.queries.companyContentQuery,
    filename
  );
  if (!tinaProps) {
    return null;
  }

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
});

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await props.params;
  const tinaProps = await getData(params.filename);
  if (!tinaProps) {
    return {};
  }

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}company/${params.filename}`;
  }

  return getSEOProps(seo);
}

export default async function Consulting(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;
  const { filename } = params;

  const data = await getData(filename);
  if (!data) {
    return (
      <ClientFallback
        queryName="companyContentQuery"
        variables={{ relativePath: `${filename}.mdx` }}
        Component={CompanyPage}
      />
    );
  }

  return <TinaClient props={data.props} Component={CompanyPage} />;
}
