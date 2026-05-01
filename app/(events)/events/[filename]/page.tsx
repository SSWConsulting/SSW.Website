import { TinaClient } from "@/app/tina-client";
import ClientFallbackWithOption from "@/components/client-fallback-with-option";
import { getVideoCardProps } from "@/helpers/events";
import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import { getSEOProps } from "@/lib/seo";
import { EVENTS_MAX_SIZE_OVERRIDE } from "@/services/server/getEvents";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { Metadata } from "next";
import EventsPage from "./events";
import EventsPageFallback from "./events-page-fallback";
import EventsPreview from "./events-preview";
import EventsV2Page from "./eventsv2";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const [eventsData, calendarData] = await Promise.all([
    client.queries.eventsConnection(),
    client.queries.eventsCalendarConnection({
      first: EVENTS_MAX_SIZE_OVERRIDE,
    }),
  ]);

  const mdxPages = eventsData.data.eventsConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  const mdxFilenames = new Set(mdxPages.map((p) => p.filename));

  const calendarPages = (calendarData.data.eventsCalendarConnection.edges ?? [])
    .filter((edge) => edge?.node && !mdxFilenames.has(edge.node._sys.filename))
    .map((edge) => ({ filename: edge.node._sys.filename }));

  return [...mdxPages, ...calendarPages];
}

const getPreviewEventData = async (filename: string) => {
  try {
    const allEvents = await client.queries.eventsCalendarConnection({
      first: EVENTS_MAX_SIZE_OVERRIDE,
    });
    const edge = allEvents.data.eventsCalendarConnection.edges?.find(
      (e) => e?.node?._sys.filename === filename
    );
    return edge?.node ?? null;
  } catch {
    return null;
  }
};

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

  const [newPage, calendarEvent, oldPage] = await Promise.all([
    newEventsPageData(filename),
    getPreviewEventData(filename),
    getData(filename),
  ]);

  if (!newPage && !calendarEvent && !oldPage) {
    return {};
  }

  if (newPage || oldPage) {
    const seo =
      newPage?.props?.data?.eventsv2?.seo || oldPage?.props?.data?.events?.seo;
    const headerUrl =
      newPage?.props?.header?.url || oldPage?.props?.header?.url;
    if (seo && !seo.canonical) {
      seo.canonical = `${headerUrl}events/${filename}`;
    }
    return getSEOProps(seo);
  }

  if (calendarEvent) {
    return {
      title: calendarEvent.title,
      description: calendarEvent.abstract ?? undefined,
    };
  }

  return {};
}

export default async function Events(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;

  const filename = params.filename;

  const [newPage, calendarEvent, oldPage] = await Promise.all([
    newEventsPageData(filename),
    getPreviewEventData(filename),
    getData(filename),
  ]);

  if (newPage) {
    return <TinaClient props={newPage.props} Component={EventsV2Page} />;
  }
  if (calendarEvent) {
    return <EventsPreview event={calendarEvent} />;
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
