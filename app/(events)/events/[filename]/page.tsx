import { TinaClient } from "@/app/tina-client";
import ClientFallbackWithOption from "@/components/client-fallback-with-option";
import { getVideoCardProps } from "@/helpers/events";
import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { Metadata } from "next";
import EventsPage from "./events";
import EventsPageFallback from "./events-page-fallback";
import EventsV2Page from "./eventsv2";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const pagesListData = await client.queries.eventsConnection();

  const pages = pagesListData.data.eventsConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  return pages;
}

const newEventsPageData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.eventsv2,
    filename,
    FileType.JSON
  );
  if (!tinaProps) {
    return null;
  }

  const global = await client.queries.global({ relativePath: "index.json" });
  const seo = tinaProps.data.eventsv2.seo;
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      header: {
        url: global.data.global.header.url,
      },
      seo,
    },
  };
};

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.eventsContentQuery,
    filename
  );

  if (!tinaProps) {
    return null;
  }

  const seo = tinaProps.data.events.seo;

  const categories =
    tinaProps.data.events?.testimonialCategories?.map(
      (category) => category.testimonialCategory.name
    ) || [];

  const videoCardProps = getVideoCardProps(tinaProps.data.events);

  const testimonialsResult = await getTestimonialsByCategories(categories);
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialsResult,
      categories,
      videoCardProps,
      header: {
        url: tinaProps.data.global.header.url,
      },
      seo,
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

  const { filename } = params;

  const [newPage, oldPage] = await Promise.all([
    newEventsPageData(filename),
    getData(filename),
  ]);

  if (!newPage && !oldPage) {
    return {};
  }

  const seo =
    newPage?.props?.data?.eventsv2?.seo || oldPage?.props?.data?.events?.seo;

  const headerUrl = newPage?.props?.header?.url || oldPage?.props?.header?.url;
  if (seo && !seo.canonical) {
    seo.canonical = `${headerUrl}events/${filename}`;
  }

  return getSEOProps(seo);
}

export default async function Events(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;

  const filename = params.filename;

  const [newPage, oldPage] = await Promise.all([
    newEventsPageData(filename),
    getData(filename),
  ]);

  if (newPage) {
    return <TinaClient props={newPage.props} Component={EventsV2Page} />;
  }
  if (oldPage) {
    return <TinaClient props={oldPage.props} Component={EventsPage} />;
  }
  return (
    <ClientFallbackWithOption
      templates={[
        {
          component: EventsV2Page,
          query: "eventsv2",
          variables: { relativePath: `${params.filename}.json` },
        },
        {
          component: EventsPageFallback,
          query: "events",
          variables: { relativePath: `${params.filename}.mdx` },
        },
      ]}
    />
  );
}
