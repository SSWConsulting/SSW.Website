import { VideoCardType } from "@/components/util/videoCards";
import { getTestimonialsByCategories } from "@/helpers/getTestimonials";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { TinaClient } from "../../tina-client";
import EventsPages from "./index";

export async function generateStaticParams() {
  const pagesListData = await client.queries.eventsConnection();

  const pages = pagesListData.data.eventsConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  return pages;
}

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
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.props.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}events/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Events({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;

  const { props } = await getData(filename);

  return <TinaClient props={props} Component={EventsPages} />;
}
