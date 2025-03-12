import { TODAY } from "@/hooks/useFetchEvents";
import { useSEO } from "@/hooks/useSeo";
import client from "@/tina/client";
import { Metadata } from "next";
import IndustryPage from ".";
import { TinaClient } from "../../tina-client";

type GenerateMetadataProps = {
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);
  const seo = tinaProps.props.data.industry.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.data.global.header.url}industry/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return { ...seoProps };
}

const getData = async (filename: string) => {
  const tinaProps = await client.queries.industryContentQuery({
    date: TODAY.toISOString(),
    relativePath: `${filename}.mdx`,
  });

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

export default async function Industry({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;
  const { props } = await getData(filename);
  return <TinaClient props={props} Component={IndustryPage} />;
}
