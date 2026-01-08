"use client";

import { TinaClient } from "@/app/tina-client";
import { useQuery } from "@tanstack/react-query";
import ArticlePage from ".";

interface ClientArticleFallbackProps {
  filename: string;
  component?: React.FC<{ tinaProps: { data: object } }>;
}

const QueryFn = async (filename: string) => {
  const res = await fetch(`/api/tina?filename=${encodeURIComponent(filename)}`);
  return await res.json();
};

const ClientArticleFallback: React.FC<ClientArticleFallbackProps> = ({
  filename,
  component,
}) => {
  const { isLoading, data } = useQuery({
    queryKey: ["article", filename],
    queryFn: () => QueryFn(filename),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  const props = {
    filename,
    data: data.data,
    query: data.query,
    variables: data.variables,
    indexPageTitle: data.indexPageTitle || "", // Provide a default or fetch from data
  };
  return <TinaClient props={props} Component={component || ArticlePage} />;
};

export default ClientArticleFallback;
