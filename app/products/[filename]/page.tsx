import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import ProductsPreview from "./products-preview";

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.productContentQuery,
    filename
  );

  return { ...tinaProps };
};

type GenerateMetaDataProps = {
  params: { filename: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
}: GenerateMetaDataProps): Promise<Metadata> {
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.data.products.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}products/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Products({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;

  const tinaProps = await getData(filename);

  return <ProductsPreview props={{ ...tinaProps }} />;
}
