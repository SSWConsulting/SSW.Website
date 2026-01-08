import { TinaClient } from "@/app/tina-client";
import { MediaCardProps } from "@/components/consulting/mediaCard/mediaCard";
import { getRandomTestimonialsByCategory } from "@/helpers/getTestimonials";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { cache } from "react";
// import ClientWrapper from "./client-wrapper";
import OldConsultingPage from "./consulting";
import ConsultingPage2 from "./consulting2";
const openSans = Open_Sans({
  variable: "--open-sans-font",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600"],
});

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

  return getSEOProps(seo);
}

export default async function Consulting(prop: {
  params: Promise<ConsultingPageParams>;
}) {
  const params = await prop.params;
  // const isNewConsultingPage: boolean = Boolean(
  //   await findConsultingPageType(params.filename)
  // );
  // let pageData:
  //   | Awaited<ReturnType<typeof consultingPageData>>
  //   | Awaited<ReturnType<typeof newConsultingPageData>>;

  // if (isNewConsultingPage) {
  //   pageData = await newConsultingPageData(params.filename);
  // } else {
  //   pageData = await consultingPageData(params.filename);
  // }

  const pageData = await newConsultingPageData(params.filename);

  const {
    props: { query, variables },
  } = pageData;
  return <h1>Consulting</h1>;

  // return isNewConsultingPage ? (
  //   <TinaClient props={props} Component={ConsultingPage2} />
  // ) : (
  //   <div className={openSans.className}>
  //     <TinaClient props={props} Component={OldConsultingPage} />
  //   </div>
  // );
}

const findConsultingPageType = async (
  filename: string
): Promise<ConsultingPageType> => {
  try {
    const v2Pages = await client.queries.consultingv2({
      relativePath: `${filename}.json`,
    });

    if (v2Pages) {
      return ConsultingPageType.New;
    }
  } catch {
    return ConsultingPageType.Old;
  }
};

enum ConsultingPageType {
  New = 1,
  Old = 0,
}
