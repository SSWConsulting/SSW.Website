import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import ProductsIndexPreview from "./products-index-preview";

const getData = async () => {
  return await fetchTinaData(client.queries.productsIndexQuery);
};

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.data.productsIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}products`;
  }

  return getSEOProps(seo);
}

export default async function ProductsIndex() {
  const tinaProps = await getData();
  return <ProductsIndexPreview props={{ ...tinaProps }} />;
}
