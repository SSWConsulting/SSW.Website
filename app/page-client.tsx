"use client";

import { useTina } from "tinacms/dist/react";
import PageContent from "./page-content";

export function PageClient({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  return <PageContent props={{ data, variables: props.variables }} />;
}
