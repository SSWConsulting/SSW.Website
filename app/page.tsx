import client from "@/tina/client";

import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { PageClient } from "./page-client";

export async function generateStaticParams() {
  let PageListData = await client.queries.pageConnection();
  const allPagesListData = PageListData;

  while (PageListData.data.pageConnection.pageInfo.hasNextPage) {
    const lastCursor = PageListData.data.pageConnection.pageInfo.endCursor;
    PageListData = await client.queries.pageConnection({
      after: lastCursor,
    });

    allPagesListData.data.pageConnection.edges.push(
      ...PageListData.data.pageConnection.edges
    );
  }

  return allPagesListData.data.pageConnection.edges.map((page) => {
    return {
      params: { filename: page.node._sys.breadcrumbs },
    };
  });
}

type GenerateMetaDataProps = {
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.data.page.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}${params.filename ?? ""}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

const getData = async (filename: string) => {
  if (!filename) {
    filename = "home";
  }
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${filename}.mdx`,
    date: TODAY.toISOString(),
  });

  const sideBars = tinaProps.data.page?.sideBar || [];
  const preFetchedUpcomingEvents = await Promise.all(
    sideBars
      .filter((sideBar) => sideBar.__typename === "PageSideBarUpcomingEvents")
      .map(async (sideBar) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingevents = await client.queries.getFutureEventsQuery({
          fromDate: today.toISOString(),
          top: sideBar.numberOfEvents,
        });

        return {
          ...sideBar,
          events: upcomingevents,
        };
      })
  );

  if (sideBars.length > 0 && preFetchedUpcomingEvents.length > 0) {
    tinaProps.data.page.sideBar = [
      ...sideBars.filter(
        ({ __typename }) => __typename !== "PageSideBarUpcomingEvents"
      ),
      ...preFetchedUpcomingEvents,
    ];
  }

  return { ...tinaProps };
};

export default async function HomePage({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;
  const tinaProps = await getData(filename);
  const buildTime = new Date().toLocaleString();
  return <PageClient props={{ ...tinaProps, buildTime }} />;
}
