import { TinaClient } from "@/app/tina-client";
import ClientFallback from "@/components/client-fallback";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import OfficePage from ".";

export const dynamic = "force-dynamic";

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.officeContentQuery,
    filename
  );

  if (!tinaProps) {
    return null;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo: tinaProps.data.offices.seo,
      header: {
        url: tinaProps.data.global.header.url,
      },
      ...tinaProps,
    },
  };
};

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  prop: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await prop.params;
  const data = await getData(params.filename);
  if (!data) {
    return {};
  }

  const seo = data.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${data.props.header.url}offices/${params.filename}`;
  }

  return getSEOProps(seo);
}

export async function generateStaticParams() {
  let pagesListData = await client.queries.officesConnection();
  const allPagesListData = pagesListData;

  while (pagesListData.data.officesConnection.pageInfo.hasNextPage) {
    const lastCursor = pagesListData.data.officesConnection.pageInfo.endCursor;
    pagesListData = await client.queries.officesConnection({
      after: lastCursor,
    });

    allPagesListData.data.officesConnection.edges.push(
      ...pagesListData.data.officesConnection.edges
    );
  }

  const pages = allPagesListData.data.officesConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));
  return pages;
}

export default async function Office(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;
  const { filename } = params;
  const data = await getData(filename);

  if (!data) {
    // Fallback to client-side fetch if SSR data is missing
    return (
      <ClientFallback
        queryName="officeContentQuery"
        variables={{ relativePath: `${filename}.mdx` }}
        Component={OfficePage}
      />
    );
  }

  return <TinaClient props={data.props} Component={OfficePage} />;
}
