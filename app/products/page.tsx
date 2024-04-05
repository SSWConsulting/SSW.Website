import { client } from "../../.tina/__generated__/client";
import RealPage from "./real-page";

export default async function ProductsIndex() {
  const tinaProps = await client.queries.productsIndexQuery();

  const seo = tinaProps.data.productsIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}/products`;
  }

  return <RealPage props={{ ...tinaProps, seo }} />;
}
