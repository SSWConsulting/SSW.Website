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

  const global = await client.queries.global({ relativePath: "index.json" });

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
