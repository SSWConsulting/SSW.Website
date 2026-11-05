import { TinaClient } from "@/app/tina-client";
import ClientFallback from "@/components/client-fallback";
import type { ClientDisplay } from "@/helpers/clientTypes";
import { findClientStory, relatedClientStories } from "@/helpers/clients";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import CaseStudies from "./index";

export const dynamic = "force-static";

export async function generateStaticParams() {
  let pageListData = await client.queries.caseStudyConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.caseStudyConnection.pageInfo.hasNextPage) {
    const lastCursor = pageListData.data.caseStudyConnection.pageInfo.endCursor;
    pageListData = await client.queries.caseStudyConnection({
      after: lastCursor,
    });

    allPagesListData.data.caseStudyConnection.edges.push(
      ...pageListData.data.caseStudyConnection.edges
    );
  }

  const pages = allPagesListData.data.caseStudyConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  return pages;
}

// The story's card metadata (logo, industries, service) and its neighbours
// live on the clients index page, in its Client List block.
const getClientList = async (): Promise<ClientDisplay[]> => {
  const index = await fetchTinaData(
    client.queries.companyContentQuery,
    "clients"
  );
  const clientList = index?.data.company._body?.find((block) =>
    block?.__typename?.endsWith("ClientList")
  ) as { clients?: ClientDisplay[] } | undefined;
  return clientList?.clients ?? [];
};

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.caseStudyContentQuery,
    filename
  );
  if (!tinaProps) {
    return null;
  }

  const seo = tinaProps.data.caseStudy.seo;
  const clients = await getClientList();

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      header: {
        url: tinaProps.data.global.header.url,
      },
      seo,
      story: findClientStory(clients, filename),
      relatedStories: relatedClientStories(clients, filename),
      ...tinaProps,
    },
  };
};

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
    seo.canonical = `${tinaProps.props.header.url}company/clients/${params.filename}`;
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
        queryName="caseStudyContentQuery"
        variables={{ relativePath: `${filename}.mdx` }}
        Component={CaseStudies}
      />
    );
  }

  return <TinaClient props={data.props} Component={CaseStudies} />;
}
