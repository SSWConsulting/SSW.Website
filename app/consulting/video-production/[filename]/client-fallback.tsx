"use client";

import { TinaClient } from "@/app/tina-client";
import { useQuery } from "@tanstack/react-query";
import VideoProduction from "./video-production";

interface ClientVideoProductionFallbackProps {
  filename: string;
}

const QueryFn = async (filename: string) => {
  const res = await fetch("/api/tina/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      queryName: "videoProductionContentQuery",
      args: [{ relativePath: `${filename}.mdx` }],
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch video production data");
  }
  const data = await res.json();
  // Compose props as in getData
  const seo = data.data?.videoProduction?.seo || {};
  if (seo && !seo.canonical && data.data?.global?.header?.url) {
    seo.canonical = `${data.data.global.header.url}consulting/video-production/${filename}`;
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

const ClientVideoProductionFallback: React.FC<
  ClientVideoProductionFallbackProps
> = ({ filename }) => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["videoProduction", filename],
    queryFn: () => QueryFn(filename),
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error loading video production data</h1>;
  }
  if (!data || !data.data) {
    return (
      <h1>
        Video production page not found. Please check the filename or try again
        later.
      </h1>
    );
  }

  return <TinaClient props={data} Component={VideoProduction} />;
};

export default ClientVideoProductionFallback;
