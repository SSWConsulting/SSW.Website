import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import ProductsPreview from "./products-preview";

// Equavalent to getStaticPaths in Page Routing
export async function generateStaticParams() {
  let PageListData = await client.queries.productsConnection();
  const allPagesListData = PageListData;

  while (PageListData.data.productsConnection.pageInfo.hasNextPage) {
    const lastCursor = PageListData.data.productsConnection.pageInfo.endCursor;
    PageListData = await client.queries.productsConnection({
      after: lastCursor,
    });

    allPagesListData.data.productsConnection.edges.push(
      ...PageListData.data.productsConnection.edges
    );
  }

  const pages = PageListData.data.productsConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  return pages;
}

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.productContentQuery,
    filename
  );

  return { ...tinaProps };
};

type GenerateMetaDataProps = {
  params: Promise<{ filename: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await props.params;
  const tinaProps = await getData(params.filename);

  const seo = tinaProps.data.products.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}products/${params.filename}`;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);

  return { ...seoProps };
}

export default async function Products(props0: {
  params: Promise<{ filename: string }>;
}) {
  const params = await props0.params;
  const { filename } = params;

  const tinaProps = await getData(filename);

  return <ProductsPreview props={{ ...tinaProps }} />;
}
