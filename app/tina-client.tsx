"use client";

import { useTina } from "tinacms/dist/react";

export function TinaClient({ props, Component }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <Component tinaProps={{ data }} props={{ ...props }} />;
}
