import { TinaClient } from "@/app/tina-client";
import ClientFallback from "@/components/client-fallback";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import LogoPage from ".";

export const dynamic = "force-static";

type GenerateMetaDataProps = {
  params: Promise<{ filename: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  prop: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await prop.params;
  const tinaData = await getData(params.filename);
  if (!tinaData) {
    return null;
  }

  const seo = tinaData.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaData.props.header.url}logo${params.filename ? `/${params.filename.join("/")}` : ""}`;
  }

  return getSEOProps(seo);
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

  const tinaProps = await fetchTinaData(
    client.queries.logosContentQuery,
    fileNameUpdated
  );

  if (!tinaProps) {
    return null;
  }

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

export default async function Logos(prop: {
  params: Promise<{ filename: string[] }>;
}) {
  const params = await prop.params;
  const { filename } = params;
  const data = await getData(filename);

  if (!data) {
    const fileNameUpdated = filename ? filename.join("/") : "index";
    return (
      <ClientFallback
        queryName="logosContentQuery"
        variables={{ relativePath: `${fileNameUpdated}.mdx` }}
        Component={LogoPage}
      />
    );
  }

  return <TinaClient props={data.props} Component={LogoPage} />;
}
