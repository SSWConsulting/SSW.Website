import { GetArticlesQueryQuery } from "@/tina/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import client from "../tina/__generated__/client";
const ARTICLES_QUERY_KEY = "articlesKey";

export const getArticles = async ({
  pageParam,
}): Promise<GetArticlesQueryQuery> => {
  console.log("query in getArticles", pageParam);
  const res = await client.queries.getArticlesQuery({
    top: 10,
    after: pageParam,
  });

  return res.data;
};

export const useFetchArticles = () => {
  const { data, fetchNextPage, isFetchingNextPage, error, isLoading } =
    useInfiniteQuery({
      queryKey: [ARTICLES_QUERY_KEY],
      queryFn: getArticles,
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => {
        return lastPage.articlesConnection.pageInfo.endCursor;
      },
    });
  return {
    nextArticles:
      data?.pages.flat().flatMap((item) =>
        item.articlesConnection.edges.map((edge) => ({
          ...edge.node,
        }))
      ) || [],

    error,
    isLoadingFuturePages: isLoading,
    fetchMoreArticles: fetchNextPage,
    isFetchingArticles: isFetchingNextPage,
    hasMoreArticles:
      data?.pages[data?.pages.length - 1].articlesConnection.pageInfo
        .hasNextPage,
  };
};
