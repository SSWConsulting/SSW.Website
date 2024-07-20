import { useInfiniteQuery } from "@tanstack/react-query";
import { ARTICLES_QUERY_KEY } from "pages/articles";
import client from "../tina/__generated__/client";

export const getArticles = async ({ pageParam }) => {
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
