import { draftMode } from "next/headers";
import { cache } from "react";
import { client } from "../../.tina/__generated__/client";
import ClientPage from "./ClientPage";
import ServerPage from "./ServerPage";

const getData = cache(async () => {
  return await client.queries.productsIndexQuery();
});

export default async function ProductsIndex() {
  const tinaProps = await getData();

  const seo = tinaProps.data.productsIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}/products`;
  }

  const { isEnabled } = draftMode();

  return isEnabled ? (
    <ClientPage props={{ ...tinaProps, seo }} />
  ) : (
    <ServerPage data={tinaProps.data} />
  );
}
