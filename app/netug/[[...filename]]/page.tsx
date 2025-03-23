import { getRandomTestimonialsByCategory } from "@/helpers/getTestimonials";
import { useSEO } from "@/hooks/useSeo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { EventInfo } from "framer-motion";
import { Metadata } from "next";
import NetUGPage from ".";
import { TinaClient } from "../../tina-client";

export const revalidate = 3600; // 1 hour

const getData = async (filename) => {
  filename = filename ? filename.join("/") : "index";

  const tinaProps = await fetchTinaData(
    client.queries.userGroupPageContentQuery,
    filename
  );

  if (!tinaProps?.data?.userGroupPage?.__typename) {
    return {
      notFound: true,
    };
  }

  let testimonialsResult = null;
  if (tinaProps.data.userGroupPage.__typename === "UserGroupPageLocationPage") {
    const priorityCategory =
      tinaProps.data?.userGroupPage?.testimonialCategories?.name;

    const categories = ["User Group"];

    if (priorityCategory) {
      categories.push(priorityCategory);
    }

    testimonialsResult = await getRandomTestimonialsByCategory(categories);
  }

  const currentDate = new Date().toISOString();

  const eventData = await client.queries.getFutureEventsQuery({
    fromDate: currentDate,
    top: 1,
    calendarType: "User Groups",
  });

  // Converting Date properties to string so they can be passed as static props
  let event: Omit<
    EventInfo,
    | "startShowBannerDateTime"
    | "endShowBannerDateTime"
    | "startDateTime"
    | "endDateTime"
  > & {
    startShowBannerDateTime?: string;
    endShowBannerDateTime?: string;
    startDateTime?: string;
    endDateTime?: string;
  };

  if (eventData?.data.eventsCalendarConnection.totalCount > 0) {
    event = {
      ...eventData?.data.eventsCalendarConnection.edges[0].node,
      point: { x: 0, y: 0 }, // Add a default point value
    };
  } else {
    const pastEventData = await client.queries.getFutureEventsQuery({
      fromDate: currentDate,
      top: 1,
      calendarType: "User Groups",
    });
    if (pastEventData?.data.eventsCalendarConnection.totalCount > 0) {
      event = {
        ...pastEventData?.data.eventsCalendarConnection.edges[0].node,
        point: { x: 0, y: 0 }, // Add a default point value
      };
    } else {
      event = null;
    }
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      testimonialsResult: testimonialsResult || [],
      seo: tinaProps.data.userGroupPage.seo,
      event,
      city: filename,
      header: {
        url: tinaProps.data.global.header.url,
      },
      ...tinaProps,
    },
  };
};

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(props0: GenerateMetaDataProps): Promise<Metadata> {
  const params = await props0.params;
  const tinaProps = await getData(params.filename);
  const seo = tinaProps.props.seo;

  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.props.header.url}netug${params.filename ? `/${params.filename}` : ""}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return { ...seoProps };
}

export async function generateStaticParams() {
  let pagesListData = await client.queries.userGroupPageConnection();
  const allPagesListData = pagesListData;

  while (pagesListData.data.userGroupPageConnection.pageInfo.hasNextPage) {
    const lastCursor =
      pagesListData.data.userGroupPageConnection.pageInfo.endCursor;
    pagesListData = await client.queries.userGroupPageConnection({
      after: lastCursor,
    });

    allPagesListData.data.userGroupPageConnection.edges.push(
      ...pagesListData.data.userGroupPageConnection.edges
    );
  }

  const pages = allPagesListData.data.userGroupPageConnection.edges.map(
    (page) => {
      if (page.node._sys.filename === "index") {
        return {
          filename: [],
        };
      }

      return {
        filename: page.node._sys.breadcrumbs,
      };
    }
  );
  return pages;
}

export default async function NetUG(
  props0: {
    params: Promise<{ filename: string[] }>;
  }
) {
  const params = await props0.params;
  const { filename } = params;
  const { props } = await getData(filename);
  return <TinaClient props={props} Component={NetUGPage} />;
}
