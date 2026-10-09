import ClientFallback from "@/components/client-fallback";
import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { Metadata } from "next";
import ProductsPreview from "./products-preview";

export const dynamic = "force-static";

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

  // Catch-all route: a page nested in a folder (e.g. content/products/
  // sophiebot/try.mdx) becomes the segments ["sophiebot", "try"], so it serves
  // at /products/sophiebot/try. Top-level pages stay a single segment.
  const pages = allPagesListData.data.productsConnection.edges.map((page) => ({
    filename: page.node._sys.breadcrumbs,
  }));

  return pages;
}

const getData = async (filename: string) => {
  const tinaProps = await fetchTinaData(
    client.queries.productContentQuery,
    filename
  );
  if (!tinaProps) {
    return null;
  }

  return { ...tinaProps };
};

type GenerateMetaDataProps = {
  params: Promise<{ filename: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  props: GenerateMetaDataProps
): Promise<Metadata> {
  const params = await props.params;
  const slug = params.filename.join("/");
  const tinaProps = await getData(slug);
  if (!tinaProps) {
    return {};
  }

  const seo = tinaProps.data.products.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}products/${slug}`;
  }

  return getSEOProps(seo);
}

export default async function Products(prop: {
  params: Promise<{ filename: string[] }>;
}) {
  const params = await prop.params;
  const slug = params.filename.join("/");

  const tinaProps = await getData(slug);
  if (!tinaProps) {
    return (
      <ClientFallback
        queryName="productContentQuery"
        variables={{ relativePath: `${slug}.mdx` }}
        Component={ProductsPreview}
      />
    );
  }

  return <ProductsPreview props={{ ...tinaProps }} />;
}
