import { TinaClient } from "@/app/tina-client";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { Metadata } from "next";
import { cache } from "react";

import ClientFallbackWithOption from "@/components/client-fallback-with-option";
import getConsultingPageMetadata from "@/helpers/consulting";
import OldConsultingPage from "./consulting";
import ConsultingPageFallback from "./consulting-page-fallback";
import ConsultingPage2 from "./consulting2";

type OldConsultingPage = Awaited<
  ReturnType<typeof client.queries.consultingContentQuery>
>;

type NewConsultingPages = Awaited<
  ReturnType<typeof client.queries.consultingv2Connection>
>;
type ConsultingPages = Awaited<
  ReturnType<typeof client.queries.consultingConnection>
>;

type ConsultingPageParams = {
  filename: string;
};

export const dynamic = "force-static";

async function extractAllPages(query, field: string) {
  let consultingFetch = await query();
  const accmulatedPages = consultingFetch;

  while (consultingFetch.data[field].pageInfo.hasNextPage) {
    const lastCursor = consultingFetch.data[field].pageInfo.endCursor;

    consultingFetch = await query({ after: lastCursor });

    accmulatedPages.data[field].edges.push(
      ...consultingFetch.data[field].edges
    );
  }
  return accmulatedPages;
}

export async function generateStaticParams(): Promise<ConsultingPageParams[]> {
  const newConsultingPages: NewConsultingPages = await extractAllPages(
    client.queries.consultingv2Connection,
    "consultingv2Connection"
  );

  const newConsultingPagesData: ConsultingPageParams[] =
    newConsultingPages.data.consultingv2Connection.edges.map((page) => {
      return { filename: page.node._sys.filename, isNewConsultingPage: true };
    });

  const consultingPagesData: ConsultingPages = await extractAllPages(
    client.queries.consultingConnection,
    "consultingConnection"
  );
  const consultingPages: ConsultingPageParams[] =
    consultingPagesData.data.consultingConnection.edges.map((page) => {
      return { filename: page.node._sys.filename, isNewConsultingPage: false };
    });

  return [...consultingPages, ...newConsultingPagesData];
}

const newConsultingPageData = cache(async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.consultingv2,
    filename,
    FileType.JSON
  );
  if (!tinaProps) {
    return null;
  }

  const global = await client.queries.global({ relativePath: "index.json" });

  const seo = tinaProps.data.consultingv2.seo;
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

const consultingPageData = cache(async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.consultingContentQuery,
    filename
  );
  if (!tinaProps) {
    return null;
  }

  const seo = tinaProps.data.consulting.seo;

  const {
    testimonialsResult,
    techCards,
    marketingData,
    categories,
    mediaCardProps,
  } = await getConsultingPageMetadata(tinaProps);

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialsResult,
      techCards: techCards,
      marketingData,
      categories,
      mediaCardProps,
      header: {
        url: tinaProps.data.global.header.url,
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

  const [newPage, oldPage] = await Promise.all([
    newConsultingPageData(filename),
    consultingPageData(filename),
  ]);

  if (!newPage && !oldPage) {
    return {};
  }

  const seo =
    newPage?.props?.data?.consultingv2?.seo ||
    oldPage.props?.data?.consulting?.seo;

  const headerUrl = newPage?.props?.header?.url || oldPage?.props?.header?.url;
  if (seo && !seo.canonical) {
    seo.canonical = `${headerUrl}consulting/${filename}`;
  }

  return getSEOProps(seo);
}

export default async function Consulting(props: {
  params: Promise<ConsultingPageParams>;
}) {
  const params = await props.params;

  const filename = params.filename;

  const [newPage, oldPage] = await Promise.all([
    newConsultingPageData(filename),
    consultingPageData(filename),
  ]);

  if (newPage) {
    return <TinaClient props={newPage.props} Component={ConsultingPage2} />;
  }
  if (oldPage) {
    return <TinaClient props={oldPage.props} Component={OldConsultingPage} />;
  }
  return (
    <ClientFallbackWithOption
      templates={[
        {
          component: ConsultingPage2,
          query: "consultingv2",
          variables: { relativePath: `${params.filename}.json` },
        },
        {
          component: ConsultingPageFallback,
          query: "consulting",
          variables: { relativePath: `${params.filename}.mdx` },
        },
      ]}
    />
  );
}
