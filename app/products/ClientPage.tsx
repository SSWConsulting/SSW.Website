"use client";

import { useTina } from "tinacms/dist/react";
import ServerPage from "./ServerPage";

export default function ClientPage({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      Eidt mode
      <ServerPage data={data} />
    </>
  );
}
