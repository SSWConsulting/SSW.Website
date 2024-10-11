"use client";

import { useTina } from "tinacms/dist/react";
import ConsultingPage from "./consulting-content";

export default function ConsultingClient({ props }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <ConsultingPage props={{ data, variables: props.variables, ...props }} />
  );
}
