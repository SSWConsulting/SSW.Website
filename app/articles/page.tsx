import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { TinaClient, TinaClientProps, UseTinaProps } from "app/tina-client";
import { getArticles } from "hooks/useFetchArticles";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import { Article } from "schema-dts";
import client from "tina/__generated__/client";
import ArticlesIndexPage from "./index";

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.queries.articlesIndexContentQuery({
    relativePath: "index.mdx",
    date: new Date().toISOString(),
  });
  const { seoProps } = useSEO(data.data.articlesIndex.seo);
  return { ...seoProps };
}

async function getDehydratedClient(): Promise<DehydratedState> {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articlesKey"],
    queryFn: getArticles,
    initialPageParam: "",
  });
  return dehydrate(queryClient);
}

async function getData() {
  const pageData = await client.queries.articlesIndexContentQuery({
    relativePath: "index.mdx",
    date: new Date().toISOString(),
  });

  const otherClient: DehydratedState = await getDehydratedClient();
  return {
    props: {
      data: pageData.data,
      query: pageData.query,
      variables: pageData.variables,
      relativePath: pageData.variables.relativePath,
      dehydratedState: otherClient,
    },
  };
}

export default async function Articles() {
  const { props } = await getData();
  console.log("dehydrated client", props.dehydratedState.queries.length);

  return <TinaClient props={props} Component={ArticlesIndexPage} />;
}
