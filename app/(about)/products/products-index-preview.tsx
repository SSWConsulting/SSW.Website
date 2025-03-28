"use client";

import { useTina } from "tinacms/dist/react";
import ProductIndex from "./products-index";

export default function ProductsIndexPreview({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <ProductIndex props={data} />;
}
