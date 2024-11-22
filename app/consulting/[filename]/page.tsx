import { MediaCardProps } from "@/components/consulting/mediaCard/mediaCard";
import { getRandomTestimonialsByCategory } from "@/helpers/getTestimonials";
import client from "@/tina/client";
import "aos/dist/aos.css"; // This is important to keep the animation
import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
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

type PageData = {
  filename: string;
  isNewConsultingPage: boolean;
};

export async function generateStaticParams(): Promise<PageData[]> {
  let newConsultingPages: NewConsultingPages =
    await client.queries.consultingv2Connection();
  const newConsultingPagesData: PageData[] =
    newConsultingPages.data.consultingv2Connection.edges.map((page) => {
      return { filename: page.node._sys.filename, isNewConsultingPage: true };
    });
  const consultingPagesData: ConsultingPages =
    await client.queries.consultingConnection();

  const consultingPages: PageData[] =
    consultingPagesData.data.consultingConnection.edges.map((page) => {
      return { filename: page.node._sys.filename, isNewConsultingPage: false };
    });

  return [...consultingPages, ...newConsultingPagesData];
}

const newConsultingPageData = async (filename: string) => {
  const tinaProps: NewConsultingPage = await client.queries.consultingv2({
    relativePath: `${filename}.json`,
  });
  const global = await client.queries.global({ relativePath: "global.json" });
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
  params: PageData;
  searchParams: { [key: string]: string | string[] | undefined };
};

// export async function generateMetadata({
//   params: { filename, isNewConsultingPage
//   },
// }: GenerateMetaDataProps): Promise<Metadata> {

//   newConsultingPageData(filename);

//   consultingPageData(filename)
//   const tinaProps = isNewConsultingPage ? await newConsultingPageData(filename) : await consultingPageData(filename);

//   const seo = tinaProps.props.data.[""].seo;
//   if (seo && !seo.canonical) {
//     seo.canonical = `${tinaProps.props.header.url}consulting/${params.filename}`;
//   }

//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const { seoProps } = useSEO(seo);

//   return { ...seoProps };
// }

export default async function Consulting({ params }: { params: PageData }) {
  // console.log("params", params);
  // const { filename, isNewConsultingPage } = params;
  // const { props } = isNewConsultingPage
  //   ? await newConsultingPageData(filename)
  //   : await consultingPageData(filename);
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
    <div className={openSans.className}>
      <TinaClient props={props} Component={OldConsultingPage} />
    </div>
  ) : (
    <div>
      <TinaClient props={props} Component={ConsultingPage2} />
    </div>
  );
}

const findConsultingPageType = async (
  filename: string
): Promise<ConsultingPageType> => {
  const tinaProps: NewConsultingPage = await client.queries.consultingv2({
    relativePath: `${filename}.json`,
  });
  if (tinaProps.data.consultingv2) return ConsultingPageType.New;
  return ConsultingPageType.Old;
};

enum ConsultingPageType {
  New = 1,
  Old = 0,
}
