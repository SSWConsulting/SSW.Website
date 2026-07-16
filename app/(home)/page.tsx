import client from "@/tina/client";

import { getSEOProps } from "@/lib/seo";
import { fetchTinaData, FileType } from "@/services/tina/fetchTinaData";
import { Metadata } from "next";
import { PageClient } from "./page-client";

export const dynamicParams = false;

const getData = async () => {
  const tinaProps = await fetchTinaData(
    client.queries.pagesv2,
    "home",
    FileType.JSON
  );

  if (!tinaProps) {
    throw new Error("Failed to fetch Tina data for the home page.");
  }

  const global = await client.queries.global({ relativePath: "index.json" });
  const blocks = tinaProps.data.pagesv2?.blocks ?? [];
  const preFetchedV3Events = await Promise.all(
    blocks.map(async (block) => {
      if (block.__typename !== "Pagesv2BlocksV3Events") return block;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const events = await client.queries.getFutureEventsQuery({
        fromDate: today.toISOString(),
        top: block.numberOfEvents ?? 3,
      });

      return {
        ...block,
        events,
      };
    })
  );

  tinaProps.data.pagesv2.blocks = preFetchedV3Events;

  return {
    ...tinaProps,
    global: global.data.global,
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.data.pagesv2.seo;
  if (seo && !seo.canonical) {
    seo.canonical = tinaProps.global.header.url;
  }

  return getSEOProps(seo);
}

export default async function HomePage() {
  const tinaProps = await getData();
  return <PageClient props={{ ...tinaProps }} />;
}
