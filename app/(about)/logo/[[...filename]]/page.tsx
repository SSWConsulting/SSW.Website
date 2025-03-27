import { TinaClient } from "@/app/tina-client";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import LogoPage from ".";

type GenerateMetaDataProps = {
  params: Promise<{ filename: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props0: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await props0.params;
  const tinaProps = await getData(params.filename);
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}logo${params.filename ? `/${params.filename}` : ""}`;
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

export default async function Logos(props0: {
  params: Promise<{ filename: string[] }>;
}) {
  const params = await props0.params;
  const { filename } = params;
  const { props } = await getData(filename);

  return <TinaClient props={props} Component={LogoPage} />;
}
