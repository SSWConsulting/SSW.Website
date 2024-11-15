import { dehydrate, DehydratedState, QueryClient } from "@tanstack/react-query";
import { TinaClient } from "app/tina-client";
import { getArticles } from "hooks/useFetchArticles";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import client from "tina/__generated__/client";
import ArticlesIndexPage from "./index";
export type ArticlesIndexContentResponse = Awaited<
  ReturnType<typeof client.queries.articlesIndexContentQuery>
>;

export const ARTICLES_QUERY_KEY = "articlesKey";

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
  const pageData: ArticlesIndexContentResponse =
    await client.queries.articlesIndexContentQuery({
      relativePath: "index.mdx",
      date: new Date().toISOString(),
    });
  return {
    props: {
      data: pageData.data,
      query: pageData.query,
      variables: pageData.variables,
      relativePath: pageData.variables.relativePath,
      dehydratedState: getDehydratedClient(),
    },
  };
}

// export async function generateMetadata(): Promise<Metadata> {
//   const tinaProps = await getData();
//   const seo = tinaProps.props.data.articlesIndex.seo;
//   const { seoProps } = useSEO(seo);
//   return { ...seoProps };
// }
export default async function Articles() {
  const { props } = await getData();
  return <TinaClient props={props} Component={ArticlesIndexPage} />;
}
