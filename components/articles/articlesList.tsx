import { QueryClient } from "@tanstack/react-query";
import { useFetchArticles } from "hooks/useFetchArticles";
import { useEffect } from "react";
import ArticleCard from "./articleCard";

const ArticlesList = () => {
  const {
    nextArticles,
    isLoadingFuturePages,
    fetchFutureNextPage,
    isFetchingFuturePages,
    hasMoreFuturePages,
  } = useFetchArticles();
  useEffect(() => {
    console.log(nextArticles);
  });
  // const listItems = articles.map((p, i) => <ArticleCard data={p} key={i} />);

  const list = nextArticles.map((article, i) => {
    return <ArticleCard data={article} key={i} />;
  });

  return <div className="flex w-full flex-col">{list}</div>;
};

export default ArticlesList;
