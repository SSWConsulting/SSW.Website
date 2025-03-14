"use client";

import { useFetchArticles } from "hooks/useFetchArticles";
import { LoadMore } from "../filter/events";
import ArticleCard, { ArticleProps } from "./articleCard";

const ArticlesList = () => {
  const {
    nextArticles,
    fetchMoreArticles,
    isFetchingArticles,
    hasMoreArticles,
  } = useFetchArticles();

  const list = nextArticles.map((article, i) => {
    const {
      author,
      title,
      seo,
      _sys: { filename },
    } = article;
    const description = seo?.description ?? null;
    const prop: ArticleProps = {
      url: `/articles/${filename}`,
      title,
      authorImage: author?.profileImg,
      authorName: author?.presenter?.name,
      authorPosition: author?.position,
      body: description,
    };

    return <ArticleCard data={prop} key={i} />;
  });

  return (
    <div className="flex w-full flex-col">
      {list}
      {hasMoreArticles && (
        <LoadMore isLoading={isFetchingArticles} load={fetchMoreArticles} />
      )}
    </div>
  );
};

export default ArticlesList;
