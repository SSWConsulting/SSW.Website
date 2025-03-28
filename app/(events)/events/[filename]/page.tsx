import { TinaClient } from "@/app/tina-client";
import { VideoCardType } from "@/components/util/videoCards";
import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { Metadata } from "next";
import EventsPage from "./events";
import EventsV2Page from "./eventsv2";

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

  const seo = tinaProps.data.events.seo;

  const categories =
    tinaProps.data.events?.testimonialCategories?.map(
      (category) => category.testimonialCategory.name
    ) || [];

  const videoCardProps =
    tinaProps.data?.events.videos?.videoCards?.map<VideoCardType>((m) => ({
      title: m.title,
      link: m.link,
    })) || [];

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
  let tinaProps;
  if (await isNewEventsPage(params.filename)) {
    tinaProps = await newEventsPageData(params.filename);
  } else {
    tinaProps = await getData(params.filename);
  }

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}events/${params.filename}`;
  }

  return getSEOProps(seo);
}

const isNewEventsPage = async (filename: string): Promise<boolean> => {
  try {
    const v2Pages = await client.queries.eventsv2({
      relativePath: `${filename}.json`,
    });
    if (v2Pages) {
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

export default async function Events(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;
  const { filename } = params;
  if (await isNewEventsPage(filename)) {
    const { props } = await newEventsPageData(filename);
    return <TinaClient props={props} Component={EventsV2Page} />;
  }
  const { props } = await getData(filename);

  return <TinaClient props={props} Component={EventsPage} />;
}
