import { TinaClient } from "@/app/tina-client";
import { TODAY } from "@/hooks/useFetchEvents";
import { useSEO } from "@/hooks/useSeo";
import client from "@/tina/client";
import { Metadata } from "next";
import LogoPage from ".";

export const dynamicParams = false;

type GenerateMetaDataProps = {
  params: { filename: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}logo/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return { ...seoProps };
}

export async function generateStaticParams() {
  const pagesListData = await client.queries.logosConnection();

  return pagesListData.data.logosConnection.edges.map((page) => {
    if (page.node._sys.filename === "index") {
      return {
        filename: [],
      };
    }

    return {
      filename: page.node._sys.breadcrumbs,
    };
  });
}

const getData = async (filename: string[]) => {
  const fileNameUpdated = filename ? filename.join("/") : "index";

  const tinaProps = await client.queries.logosContentQuery({
    relativePath: `${fileNameUpdated}.mdx`,
    date: TODAY.toISOString(),
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo: tinaProps.data.logos.seo,
      header: {
        url: tinaProps.data.global.header.url,
      },
    },
  };
};

export default async function Logos({
  params,
}: {
  params: { filename: string[] };
}) {
  const { filename } = params;
  const { props } = await getData(filename);

  return <TinaClient props={props} Component={LogoPage} />;
}
