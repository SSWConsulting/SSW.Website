import { TinaClient } from "@/app/tina-client";
import ClientFallbackWithOption from "@/components/client-fallback-with-option";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css";
import { Metadata } from "next";
import { cache } from "react";
import ThankYouPage from "./thankYouPage";

type ThankYouPageParams = {
  filename: string;
};

export const dynamic = "force-static";

export async function generateStaticParams(): Promise<ThankYouPageParams[]> {
  const data = await client.queries.thankYouConnection();
  return (
    data.data.thankYouConnection.edges?.map((edge) => ({
      filename: edge.node._sys.filename,
    })) ?? []
  );
}

const getThankYouPageData = cache(async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.thankYou,
    filename,
    FileType.JSON
  );
  if (!tinaProps) {
    return null;
  }

  const global = await client.queries.global({ relativePath: "index.json" });

  const seo = tinaProps.data.thankYou.seo;
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      header: {
        url: global.data.global.header.url,
      },
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
  prop: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await prop.params;
  const { filename } = params;

  const page = await getThankYouPageData(filename);
  if (!page) {
    return {};
  }

  const seo = page.props.data.thankYou.seo;
  const headerUrl = page.props.header.url;
  if (seo && !seo.canonical) {
    seo.canonical = `${headerUrl}thank-you/${filename}`;
  }

  return getSEOProps(seo);
}

export default async function ThankYou(props: {
  params: Promise<ThankYouPageParams>;
}) {
  const params = await props.params;
  const { filename } = params;

  const page = await getThankYouPageData(filename);

  if (page) {
    return <TinaClient props={page.props} Component={ThankYouPage} />;
  }

  return (
    <ClientFallbackWithOption
      templates={[
        {
          component: ThankYouPage,
          query: "thankYou",
          variables: { relativePath: `${filename}.json` },
        },
      ]}
    />
  );
}
