import client from "@/tina/client";

export const dynamicParams = false;

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

  const pages = allPagesListData.data.productsConnection.edges.map((page) => ({
    filename: page.node._sys.filename,
  }));

  return pages;
}

export default function ProductsIndex() {
  return <div>Products Index</div>;
}
