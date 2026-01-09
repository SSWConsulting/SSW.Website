"use client";

import { useQueries, useQuery } from "@tanstack/react-query";
import AOS from "aos";
import axios from "axios";
import { useEffect } from "react";
import { useEditState, useTina } from "tinacms/dist/react";
import { useBranch } from "./providers/branch-provider";

export type UseTinaProps = {
  query: string;
  variables: object & { relativePath?: string };
  data: object;
};

export type TinaClientProps<T> = {
  props: UseTinaProps & T;
  Component: React.FC<{ tinaProps: { data: object }; props: T }>;
};

export function TinaClient<T>({ props, Component }: TinaClientProps<T>) {
  const { edit } = useEditState();

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  console.log("props", props);

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

  return <Component tinaProps={{ data }} props={{ ...props }} />;
}
