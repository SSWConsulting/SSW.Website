"use client";

import { useTina } from "tinacms/dist/react";
import ProductsContent from "./products-content";

export default function ProductsPreview({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <ProductsContent
      props={{
        data,
        variables: props.variables,
        // The parent product is fetched separately for a sub-page's sidebar.
        // It isn't part of this document's Tina query, so it stays static -
        // the sidebar is edited on the product page itself.
        parent: props.parent,
      }}
    />
  );
}
