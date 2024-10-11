"use client";
import AOS from "aos";

import { useEffect } from "react";
import { useTina } from "tinacms/dist/react";
import ConsultingPage from "./consulting-content";

export default function ConsultingClient({ props }) {
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

  return (
    <ConsultingPage props={{ data, variables: props.variables, ...props }} />
  );
}
