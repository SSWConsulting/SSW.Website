"use client";

import Loading from "@/app/loading";
import { TinaClient } from "@/app/tina-client";
import NotFoundError from "@/errors/not-found";
import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useEffect } from "react";
import { useIsAdminPage } from "../hooks/useIsAdmin";
import { Container } from "./util/container";

export interface ClientFallbackWithOptionProps {
  templates: Fallback[];
}

const QueryFn = async ({
  queries: queryNames,
  args,
}: {
  queries: string[];
  args: { relativePath: string }[];
}) => {
  const res = await fetch("/api/tina/query/with-fallbacks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      queryNames,
      args,
    }),
  });

  if (res.status === 404) {
    throw new NotFoundError("Document Not Found");
  }
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const data = await res.json();
  return data;
};

const ClientFallbackWithOption = ({
  templates,
}: ClientFallbackWithOptionProps) => {
  const components = templates.map((opt) => opt.component);
  const queryNames = templates.map((opt) => opt.query);
  const variables = templates.map((opt) => opt.variables);

  const { isAdmin, isLoading: isAdminLoading } = useIsAdminPage();

  useEffect(() => {
    if (!isAdmin && !isAdminLoading) {
      notFound();
    }
  }, [isAdmin, isAdminLoading]);

  const { isLoading, data, error } = useQuery({
    queryKey: ["with-fallbacks", queryNames, variables],
    queryFn: () => QueryFn({ queries: queryNames, args: variables }),
    retry: false,
  });

  const componentIndex = data?.queryIndex ?? 0;
  const Component = components[componentIndex];

  return (
    <>
      {isLoading && <Loading />}
      {error instanceof NotFoundError && notFound()}
      {error && (
        <Container className="flex justify-center" width="large" size="custom">
          <h1>Failed to load data</h1>
        </Container>
      )}
      {data && Component && <TinaClient props={data} Component={Component} />}
    </>
  );
};

type Fallback = {
  query: string;
  variables: { relativePath: string };
  component: React.FC<unknown>;
  props?: object;
};

export default ClientFallbackWithOption;
