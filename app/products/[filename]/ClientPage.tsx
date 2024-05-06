"use client";

import { useTina } from "tinacms/dist/react";
import ServerPage from "./ServerPage";

export default function ClientPage({ props }) {
  useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <>
      edit mode
      <ServerPage props={props} />
    </>
  );
}
