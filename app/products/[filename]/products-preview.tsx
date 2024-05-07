"use client";

import { useTina } from "tinacms/dist/react";
import ProductsContent from "./products-content";

export default function ProductsPreviwe({ props }) {
  useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <ProductsContent props={props} />;
}
