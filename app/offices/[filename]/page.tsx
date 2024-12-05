import { useSEO } from "@/hooks/useSeo";
import client from "@/tina/client";
import { TODAY } from "hooks/useFetchEvents";
import { Metadata } from "next";
import OfficesPage from ".";
import { TinaClient } from "../../tina-client";

const getData = async (filename: string) => {
  const tinaProps = await client.queries.officeContentQuery({
    relativePath: `${filename}.mdx`,
    date: TODAY.toISOString(),
  });

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
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}offices/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return { ...seoProps };
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

export default async function Offices({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;
  const { props } = await getData(filename);
  return <TinaClient props={props} Component={OfficesPage} />;
}
