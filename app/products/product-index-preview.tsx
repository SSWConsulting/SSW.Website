"use client";

import { useTina } from "tinacms/dist/react";
import ProductIndex from "./product-index";

export default function ProductIndexPreview({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <ProductIndex data={data} />;
}
