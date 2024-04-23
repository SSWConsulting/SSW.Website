import client from "@/tina/client";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import ClientPage from "./ClientPage";
import ServerPage from "./ServerPage";

const getData = async () => {
  return await client.queries.productsIndexQuery();
};

export async function generateMetadata(): Promise<Metadata> {
  // TODO: Replicate logic from seo.tsx, export it from a different file so this can be reused
  const tinaProps = await getData();

  const seo = tinaProps.data.productsIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}/products`;
  }

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
    },
  };
}

export default async function ProductsIndex() {
  const tinaProps = await getData();

  const { isEnabled } = draftMode();

  return isEnabled ? (
    <ClientPage props={{ ...tinaProps }} />
  ) : (
    <ServerPage data={tinaProps.data} />
  );
}
