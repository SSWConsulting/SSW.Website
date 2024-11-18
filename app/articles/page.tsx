import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { TinaClient } from "app/tina-client";
import { ARTICLES_QUERY_KEY, getArticles } from "hooks/useFetchArticles";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
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
    queryKey: [ARTICLES_QUERY_KEY],
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

  const queryClient: DehydratedState = await getDehydratedClient();
  return {
    props: {
      data: pageData.data,
      query: pageData.query,
      variables: pageData.variables,
      relativePath: pageData.variables.relativePath,
      dehydratedState: queryClient,
    },
  };
}

export default async function Articles() {
  const { props } = await getData();
  console.log("dehydrated client", props.dehydratedState.queries.length);

  return <TinaClient props={props} Component={ArticlesIndexPage} />;
}
