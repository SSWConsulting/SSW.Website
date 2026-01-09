"use client";

import { ConsultingContentQueryQuery } from "@/tina/types";
import { useQueries, useQuery } from "@tanstack/react-query";
import { json } from "stream/consumers";

import Consulting, { OldConsultingPage } from "./consulting";

const ConsultingPageFallback = (props: { tinaProps: OldConsultingPage }) => {
  console.log("all props", props);
  const tinaProps = props.tinaProps;
  console.log("tinaProps", tinaProps);
  const { data, error } = useQuery({
    queryKey: ["consulting-page-fallback"],
    queryFn: () =>
      fetch("/api/consulting-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: tinaProps.data,
        }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        return res.json();
      }),
  });

  if (data) {
    return (
      <>
        <h1>Consulting page fallback :D</h1>
        <Consulting
          tinaProps={tinaProps}
          props={{ variables: props.props.variables, ...props, ...data }}
        />
        ;
      </>
    );
  }
  if (error) {
    return <h1>Error loading consulting metadata</h1>;
  }
};

export default ConsultingPageFallback;
