import { VideoCardType } from "@/components/util/videoCards";
import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { TinaClient } from "../../tina-client";
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
  const tinaProps = await client.queries.eventsv2({
    relativePath: `${filename}.json`,
  });
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
  const tinaProps = await client.queries.eventsContentQuery({
    relativePath: `${filename}.mdx`,
    date: TODAY.toISOString(),
  });

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
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  let tinaProps;
  if (await isNewEventsPage(params.filename)) {
    tinaProps = await getData(params.filename);
  } else {
    tinaProps = await newEventsPageData(params.filename);
  }

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}events/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
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

export default async function Events({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;
  if (await isNewEventsPage(filename)) {
    const { props } = await newEventsPageData(filename);
    return <TinaClient props={props} Component={EventsV2Page} />;
  }
  const { props } = await getData(filename);

  return <TinaClient props={props} Component={EventsPage} />;
}
