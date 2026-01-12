import { TinaClient } from "@/app/tina-client";
import ClientFallback from "@/components/client-fallback";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import IndustryPage from ".";

export const dynamic = "force-static";

type GenerateMetadataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  prop: GenerateMetadataProps
): Promise<Metadata> {
  const params = await prop.params;
  const tinaProps = await getData(params.filename);
  if (!tinaProps) {
    return {};
  }
  const seo = tinaProps.props.data.industry.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.data.global.header.url}industry/${params.filename}`;
  }

  return getSEOProps(seo);
}

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.industryContentQuery,
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
    },
  };
};

export async function generateStaticParams() {
  const pagesListData = await client.queries.industryConnection();

  return pagesListData.data.industryConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));
}

export default async function Industry(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;
  const { filename } = params;
  const data = await getData(filename);
  if (!data) {
    return (
      <ClientFallback
        queryName="industryContentQuery"
        variables={{ relativePath: `${filename}.mdx` }}
        Component={IndustryPage}
      />
    );
  }
  return <TinaClient props={data.props} Component={IndustryPage} />;
}
