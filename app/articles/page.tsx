import { fetchTinaData } from "@/services/tina/fetchTinaData";
import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { TinaClient } from "app/tina-client";
import { ARTICLES_QUERY_KEY, getArticles } from "hooks/useFetchArticles";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import client from "tina/__generated__/client";
import ArticlesIndexPage from "./index";

export const revalidate = 3600; // 1 hour

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.queries.articlesIndexContentQuery({
    relativePath: "index.mdx",
    date: new Date().toISOString(),
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
  const tinaProps = await fetchTinaData(
    client.queries.articlesIndexContentQuery,
    "index"
  );

  const queryClient: DehydratedState = await getDehydratedClient();
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      relativePath: tinaProps.variables.relativePath,
      dehydratedState: queryClient,
    },
  };
}

export default async function Articles() {
  const { props } = await getData();
  return <TinaClient props={props} Component={ArticlesIndexPage} />;
}
