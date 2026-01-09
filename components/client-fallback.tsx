"use client";

import { TinaClient, UseTinaProps } from "@/app/tina-client";
import client from "@/tina/client";
import { useQuery } from "@tanstack/react-query";

export interface ClientFallbackProps<T = {}> {
  queryName: keyof typeof client.queries;
  variables?: any;
  Component: React.FC<{ tinaProps: UseTinaProps; props: T }>;
  getSeoUrl?: (data: any, variables?: any) => string;
}

const QueryFn = async (
  queryName: string,
  variables?: any,
  getSeoUrl?: (data: any, variables?: any) => string
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
  let seo = data.data?.seo || data.data?.videoProduction?.seo || {};
  if (seo && !seo.canonical && getSeoUrl && data.data?.global?.header?.url) {
    seo.canonical = getSeoUrl(data, variables);
  }
  return {
    data: data.data,
    query: data.query,
    variables: data.variables,
    header: {
      url: data.data?.global?.header?.url,
    },
    seo,
    ...data,
  };
};

const ClientFallback: React.FC<ClientFallbackProps> = ({
  queryName,
  variables,
  Component,
  getSeoUrl,
}) => {
  console.log("fallback hit");
  const { isLoading, data, error } = useQuery({
    queryKey: [queryName, variables],
    queryFn: () => QueryFn(queryName, variables, getSeoUrl),
  });
  return (
    <>
      <h1>Client Fallback</h1>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error loading data</h1>}
      {data && <TinaClient props={data} Component={Component} />}
    </>
  );

  // return <TinaClient props={data} Component={Component} />;
};

export default ClientFallback;
