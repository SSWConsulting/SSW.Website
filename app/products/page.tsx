import client from "@/tina/client";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import ProductsIndexContent from "./products-index";
import ProductsIndexPreview from "./products-index-preview";

const getData = async () => {
  return await client.queries.productsIndexQuery();
};

export async function generateMetadata(): Promise<Metadata> {
  const tinaProps = await getData();

  const seo = tinaProps.data.productsIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}/products`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function ProductsIndex() {
  const tinaProps = await getData();

  const { isEnabled: isPreview } = draftMode();

  return isPreview ? (
    <ProductsIndexPreview props={{ ...tinaProps }} />
  ) : (
    <ProductsIndexContent props={tinaProps.data} />
  );
}
