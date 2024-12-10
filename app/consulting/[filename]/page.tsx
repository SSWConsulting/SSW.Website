import { MediaCardProps } from "@/components/consulting/mediaCard/mediaCard";
import { getRandomTestimonialsByCategory } from "@/helpers/getTestimonials";
import { useSEO } from "@/hooks/useSeo";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { TODAY } from "hooks/useFetchEvents";
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { TinaClient } from "../../tina-client";
import OldConsultingPage from "./consulting";
import ConsultingPage2 from "./consulting2";
const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600"],
});
type NewConsultingPage = Awaited<
  ReturnType<typeof client.queries.consultingv2>
>;

type OldConsultingPage = Awaited<
  ReturnType<typeof client.queries.consultingContentQuery>
>;

type NewConsultingPages = Awaited<
  ReturnType<typeof client.queries.consultingv2Connection>
>;
type ConsultingPages = Awaited<
  ReturnType<typeof client.queries.consultingConnection>
>;

export const dynamicParams = false;

type ConsultingPageParams = {
  filename: string;
};

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

const newConsultingPageData = async (filename: string) => {
  const tinaProps: NewConsultingPage = await client.queries.consultingv2({
    relativePath: `${filename}.json`,
  });
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
};

const consultingPageData = async (filename: string) => {
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
  params: { filename },
}: GenerateMetaDataProps): Promise<Metadata> {
  const isNewConsultingPage = Boolean(await findConsultingPageType(filename));

  const tinaProps = isNewConsultingPage
    ? await newConsultingPageData(filename)
    : await consultingPageData(filename);

  const seo =
    tinaProps.props.data[isNewConsultingPage ? "consultingv2" : "consulting"]
      .seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}consulting/${filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Consulting({
  params,
}: {
  params: ConsultingPageParams;
}) {
  const isNewConsultingPage: boolean = Boolean(
    await findConsultingPageType(params.filename)
  );
  let pageData:
    | Awaited<ReturnType<typeof consultingPageData>>
    | Awaited<ReturnType<typeof newConsultingPageData>>;

  if (isNewConsultingPage) {
    pageData = await newConsultingPageData(params.filename);
  } else {
    pageData = await consultingPageData(params.filename);
  }
  const { props } = pageData;

  return isNewConsultingPage ? (
    <TinaClient props={props} Component={ConsultingPage2} />
  ) : (
    <div className={openSans.className}>
      <TinaClient props={props} Component={OldConsultingPage} />
    </div>
  );
}

const findConsultingPageType = async (
  filename: string
): Promise<ConsultingPageType> => {
  const v2Pages = await client.queries.consultingv2Connection();

  for (const page of v2Pages.data.consultingv2Connection.edges) {
    if (page.node._sys.filename === filename) {
      return ConsultingPageType.New;
    }
  }
  return ConsultingPageType.Old;
};

enum ConsultingPageType {
  New = 1,
  Old = 0,
}
