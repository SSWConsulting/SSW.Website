"use client";

import { TinaClient } from "@/app/tina-client";
import { useQuery } from "@tanstack/react-query";

type ClientPageWrapperProps<T> = {
  query: string;
  variables: object;
  component?: React.FC<{ tinaProps: { data: object } }>;
};
const ClientPageFallback = <T,>({
  query,
  variables,
  component,
}: ClientPageWrapperProps<T>) => {
  const { isLoading, data } = useQuery({
    queryKey: [query, variables],
    queryFn: ({ queryKey }) =>
      QueryFn({
        query: queryKey[0] as string,
        variables: queryKey[1] as object,
      }),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const props = { query, variables, data: data.data };
  return <TinaClient props={props} Component={component} />;
};

const QueryFn = async ({
  query,
  variables,
}: {
  query: string;
  variables: object;
}) => {
  const body = JSON.stringify({ query, variables });

  const res = await fetch("/api/tina", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  return await res.json();
};

export default ClientPageFallback;
