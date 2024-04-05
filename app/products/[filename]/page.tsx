// import client from "@/tina/client";

// export async function generateStaticParams() {
//   let PageListData = await client.queries.productsConnection();
//   const allPagesListData = PageListData;

//   while (PageListData.data.productsConnection.pageInfo.hasNextPage) {
//     const lastCursor = PageListData.data.productsConnection.pageInfo.endCursor;
//     PageListData = await client.queries.productsConnection({
//       after: lastCursor,
//     });

//     allPagesListData.data.productsConnection.edges.push(
//       ...PageListData.data.productsConnection.edges
//     );
//   }
//   return {
//     paths: allPagesListData.data.productsConnection.edges.map((page) => ({
//       params: { filename: page.node._sys.filename },
//     })),
//     fallback: false,
//   };
// }

export default function ProductsIndex() {
  return <div>Products Index</div>;
}
