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

  const list = nextArticles.map((article, index) => {
    const {
      author,
      title,
      seo,
      publishedDate,
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
      publishedDate,
    };

    return <ArticleCard data={prop} key={`article-card-${index}`} />;
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
