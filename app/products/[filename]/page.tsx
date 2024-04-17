import client from "@/tina/client";
import ServerPage from "./ServerPage";

export const dynamicParams = false;

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

const getData = async (filename: string) => {
  const data = await client.queries.productContentQuery({
    relativePath: `${filename}.mdx`,
  });

  return { ...data, timestamp: new Date().toISOString() };
};

export default async function ProductsIndex({
  params,
}: {
  params: { filename: string };
}) {
  const { filename } = params;

  const tinaProps = await getData(filename);

  return (
    <>
      <h1>{tinaProps.timestamp}</h1>
      <ServerPage data={tinaProps.data} />
    </>
  );
}
