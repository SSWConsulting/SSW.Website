"use client";

import AOS from "aos";
import { useEffect } from "react";
import { useTina } from "tinacms/dist/react";
export type UseTinaProps = {
  query: string;
  variables: object;
  data: object;
};

export type TinaClientProps<T> = {
  props: UseTinaProps & T;
  Component: React.FC<{ tinaProps: { data: object }; props: T }>;
};

export function TinaClient<T>({ props, Component }: TinaClientProps<T>) {
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

  return <Component tinaProps={{ data }} props={{ ...props }} />;
}
