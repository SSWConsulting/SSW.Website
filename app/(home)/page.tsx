import client from "@/tina/client";

import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import { Metadata } from "next";
import { PageClient } from "./page-client";

export const dynamicParams = false;

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await props.params;
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.data.page.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}${params.filename ?? ""}`;
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

  return { ...tinaProps };
};

export default async function HomePage(props: {
  params: Promise<{ filename: string }>;
}) {
  const params = await props.params;
  const { filename } = params;
  const tinaProps = await getData(filename);
  return <PageClient props={{ ...tinaProps }} />;
}
