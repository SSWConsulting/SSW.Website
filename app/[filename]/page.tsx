import client from "@/tina/client";

import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import Page from ".";
import { TinaClient } from "../tina-client";

export const dynamicParams = false;

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
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const { props } = await getData(params.filename);

  const seo = props.data.page.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${props.data.global.header.url}${params.filename ?? ""}`;
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

export default async function HomePage({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;
  const { props } = await getData(filename);
  return <TinaClient props={props} Component={Page} />;
}
