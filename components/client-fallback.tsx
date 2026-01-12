"use client";

import Loading from "@/app/loading";
import { TinaClient, UseTinaProps } from "@/app/tina-client";
import client from "@/tina/client";
import { useQuery } from "@tanstack/react-query";
import { Container } from "./util/container";

export interface ClientFallbackProps<T> {
  queryName: keyof typeof client.queries;
  variables?: any;
  Component: React.FC<{ tinaProps: { data: object }; props: T }>;
  // getSeoUrl?: (data: any, variables?: any) => string;
}

const QueryFn = async (
  queryName: string,
  variables?: any
  // getSeoUrl?: (data: any, variables?: any) => string
) => {
  const res = await fetch("/api/tina/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      queryName,
      args: variables ? [variables] : [],
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return {
    data: data.data,
    query: data.query,
    variables: data.variables,
    header: {
      url: data.data?.global?.header?.url,
    },
    ...data,
  };
};

const ClientFallback = ({ queryName, variables, Component }) => {
  console.log("fallback hit");
  const { isLoading, data, error } = useQuery({
    queryKey: [queryName, variables],
    queryFn: () => QueryFn(queryName, variables),
  });
  return (
    <>
      {isLoading && <Loading />}
      {data && <TinaClient props={data} Component={Component} />}
      {error && (
        <Container className="flex justify-center" width="large" size="custom">
          <h1>Failed to load data</h1>
        </Container>
      )}
    </>
  );
};

export default ClientFallback;
