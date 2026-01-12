"use client";

import Loading from "@/app/loading";
import { TinaClient } from "@/app/tina-client";
import NotFoundError from "@/errors/not-found";
import client from "@/tina/client";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useIsAdminPage } from "./hooks/useIsAdmin";
import { Container } from "./util/container";

export interface ClientFallbackProps<T> {
  queryName: keyof typeof client.queries;
  variables: { relativePath: string };
  Component: React.FC<{ tinaProps: { data: object }; props: T }>;
}

const QueryFn = async (
  queryName: string,
  variables?: { relativePath: string }
) => {
  const res = await fetch("/api/tina/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      queryName,
      relativePath: variables?.relativePath,
    }),
  });

  if (res.status === 404) {
    throw new NotFoundError("Document Not Found");
  }
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

const ClientFallback = <T,>({
  queryName,
  variables,
  Component,
}: ClientFallbackProps<T>) => {
  const { isLoading, data, error } = useQuery({
    queryKey: [queryName, variables],
    queryFn: () => QueryFn(queryName, variables),
    retry: false,
  });

  const { isAdmin, isLoading: isAdminLoading } = useIsAdminPage();

  useEffect(() => {
    if (!isAdmin && !isAdminLoading) {
      notFound();
    }
  }, [isAdmin, isAdminLoading]);
  return (
    <>
      {error instanceof NotFoundError && notFound()}
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
