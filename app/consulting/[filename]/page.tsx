import { MediaCardProps } from "@/components/consulting/mediaCard/mediaCard";
import { getRandomTestimonialsByCategory } from "@/helpers/getTestimonials";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { TinaClient } from "../../tina-client";
import ConsultingPage from "./consulting";

export const dynamicParams = false;

export async function generateStaticParams() {
  let pageListData = await client.queries.consultingConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.consultingConnection.pageInfo.hasNextPage) {
    const lastCursor =
      pageListData.data.consultingConnection.pageInfo.endCursor;
    pageListData = await client.queries.consultingConnection({
      after: lastCursor,
    });

    allPagesListData.data.consultingConnection.edges.push(
      ...pageListData.data.consultingConnection.edges
    );
  }

  const pages = allPagesListData.data.consultingConnection.edges.map(
    (page) => ({
      filename: page.node._sys.filename,
    })
  );

  return pages;
}

const getData = async (filename: string) => {
  const tinaProps = await client.queries.consultingContentQuery({
    relativePath: `${filename}.mdx`,
    date: TODAY.toISOString(),
  });

  const seo = tinaProps.data.consulting.seo;

  const categories =
    tinaProps.data.consulting?.testimonialCategories
      ?.map((category) => category?.testimonialCategory?.name)
      ?.filter((item) => !!item) || [];

  const testimonialsResult = await getRandomTestimonialsByCategory(categories);

  const technologyCardNames =
    tinaProps.data.consulting.technologies?.technologyCards?.reduce<string[]>(
      (pre, cur) => {
        !!cur.technologyCard?.name && pre.push(cur.technologyCard.name);
        return pre;
      },
      []
    ) || [];
  const technologyCardsProps = await client.queries.technologyCardContentQuery({
    cardNames: technologyCardNames,
  });

  const technologyCardDocs =
    technologyCardsProps?.data.technologiesConnection.edges.map((n) => n.node);
  const techCards =
    tinaProps.data.consulting.technologies?.technologyCards?.map((c) => ({
      ...technologyCardDocs?.find(
        (n) => !!n.name && n.name === c.technologyCard?.name
      ),
    })) || [];

  const categoriesData =
    tinaProps.data.consulting.testimonialCategories
      ?.filter((category) => !!category?.testimonialCategory)
      ?.map((category) => category.testimonialCategory.name) ?? [];

  const mediaCardProps =
    tinaProps.data.consulting?.medias?.mediaCards?.map(
      (m): MediaCardProps => ({
        type: m.type as MediaCardProps["type"],
        content: m.content,
      })
    ) || [];
  const marketingSection = await client.queries.marketing({
    relativePath: "/why-choose-ssw.mdx",
  });

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialsResult,
      techCards: techCards,
      marketingData: marketingSection.data,
      categories: categoriesData,
      mediaCardProps: mediaCardProps,
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
    seo.canonical = `${tinaProps.props.header.url}consulting/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Consulting({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;

  const { props } = await getData(filename);

  return <TinaClient props={props} Component={ConsultingPage} />;
}
