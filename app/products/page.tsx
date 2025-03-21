import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import ProductsIndexPreview from "./products-index-preview";

export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  return [];
}

const getData = async () => {
  return await fetchTinaData(client.queries.productsIndexQuery);
};

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.data.productsIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}products`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function ProductsIndex() {
  const tinaProps = await getData();
  return <ProductsIndexPreview props={{ ...tinaProps }} />;
}
