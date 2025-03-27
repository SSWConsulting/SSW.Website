import client from "@/tina/client";

import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import { Metadata } from "next";
import Page from ".";
import { TinaClient } from "../../tina-client";

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
  const pages = allPagesListData.data.pageConnection.edges
    .filter((page) => page.node._sys.filename !== "home") // Remove "home" page as it is not handled by this route
    .map((page) => ({
      filename: page.node._sys.filename,
    }));

  return pages;
}

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  prop: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await prop.params;
  const { props } = await getData(params.filename);

  const seo = props.data.page.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${props.data.global.header.url}${params.filename ?? ""}`;
  }

  return getSEOProps(seo);
}

const getData = async (filename: string) => {
  if (!filename) {
    filename = "home";
  }

  const tinaProps = await fetchTinaData(client.queries.contentQuery, filename);

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

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      city: filename,
      header: {
        url: tinaProps.data.global.header.url,
      },
      ...tinaProps,
    },
  };
};

export default async function HomePage(prop: {
  params: Promise<{ filename: string }>;
}) {
  const params = await prop.params;
  const { filename } = params;
  const { props } = await getData(filename);
  return <TinaClient props={props} Component={Page} />;
}
