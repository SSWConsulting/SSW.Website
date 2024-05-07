import client from "@/tina/client";
import { Metadata } from "next";
import { draftMode } from "next/headers";
import ProductIndex from "./product-index";
import ProductIndexPreview from "./product-index-preview";

const getData = async () => {
  return await client.queries.productsIndexQuery();
};

import { useSEO } from "hooks/useSeo";

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

  const { isEnabled } = draftMode();

  return isEnabled ? (
    <ProductIndexPreview props={{ ...tinaProps }} />
  ) : (
    <ProductIndex data={tinaProps.data} />
  );
}
