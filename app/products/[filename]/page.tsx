import client from "@/tina/client";
import { cache } from "react";
import ServerPage from "./ServerPage";

export async function generateStaticParams() {
  const pagesData = await client.queries.productsConnection();
  // const allPagesListData = PageListData;

  // while (PageListData.data.productsConnection.pageInfo.hasNextPage) {
  //   const lastCursor = PageListData.data.productsConnection.pageInfo.endCursor;
  //   PageListData = await client.queries.productsConnection({
  //     after: lastCursor,
  //   });

  //   allPagesListData.data.productsConnection.edges.push(
  //     ...PageListData.data.productsConnection.edges
  //   );
  // }

  const pages = pagesData.data.productsConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  return pages;
}

const getData = cache(async (filename: string) => {
  return await client.queries.productContentQuery({
    relativePath: `${filename}.mdx`,
  });
});

export default async function ProductsIndex({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;

  const tinaProps = await getData(filename);

  return <ServerPage data={tinaProps.data} />;
}
