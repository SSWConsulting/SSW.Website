import { draftMode } from "next/headers";
import { client } from "../../.tina/__generated__/client";
import ClientPage from "./ClientPage";
import ServerPage from "./ServerPage";

export default async function ProductsIndex() {
  const tinaProps = await client.queries.productsIndexQuery();

  const seo = tinaProps.data.productsIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}/products`;
  }

  const { isEnabled } = draftMode();

  return isEnabled ? (
    <ClientPage props={{ ...tinaProps, seo }} />
  ) : (
    <ServerPage props={{ ...tinaProps, seo }} />
  );
}
