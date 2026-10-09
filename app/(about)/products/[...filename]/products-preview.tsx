"use client";

import { useTina } from "tinacms/dist/react";
import ProductsContent from "./products-content";

export default function ProductsPreview({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <ProductsContent props={{ data, variables: props.variables }} />;
}
