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

  console.log("edit mode:", edit);
  const branch = useBranch();
  console.log("props:", props);
  const collection = Object.keys(props.data)[0];
  const path = props.variables.relativePath;
  const fetchPath = `/api/tina/branch/main/collection/${collection}/path/${path}`;

  const res = useQuery({
    queryKey: [fetchPath],
    queryFn: async () => {
      console.log("Fetching from", fetchPath);
      const response = await axios.get(fetchPath);
      return response.data;
    },
  });
  console.log("res", res.data);
  console.log("DATA", res.data);

  if (edit) {
  }
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



const TinaEditorComponent = ()=>{ {

}