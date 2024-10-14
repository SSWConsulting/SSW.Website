"use client";

import AOS from "aos";

import { useEffect } from "react";
import { useTina } from "tinacms/dist/react";

export function TinaClient({ props, Component }) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      AOS.init({
        duration: 1200,
        once: true,
      });

      AOS.refresh();
    }

    return () => {
      if (typeof window !== "undefined") {
        AOS.refreshHard();
      }
    };
  }, []);

  return <Component props={{ data, variables: props.variables }} />;
}
