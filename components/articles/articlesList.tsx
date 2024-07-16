import { useFetchArticles } from "hooks/useFetchArticles";
import { LoadMore } from "../filter/events";
import ArticleCard, { ArticleProps } from "./articleCard";

const ArticlesList = () => {
  const {
    nextArticles,
    isLoadingFuturePages,
    fetchFutureNextPage,
    isFetchingFuturePages,
    hasMoreFuturePages,
  } = useFetchArticles();

  const list = nextArticles.map((article, i) => {
    const {
      title,
      articleAuthor: { authorImage, authorName, authorPosition },
      seo: { description },
      _sys: { filename },
    } = article;
    const prop: ArticleProps = {
      url: `/articles/${filename}`,
      title,
      authorImage,
      authorName,
      authorPosition,
      body: description,
    };

    return <ArticleCard data={prop} key={i} />;
  });

  return (
    <div className="flex w-full flex-col">
      {list}
      {hasMoreFuturePages && (
        <LoadMore
          isLoading={isFetchingFuturePages}
          load={fetchFutureNextPage}
        />
      )}
    </div>
  );
};

export default ArticlesList;
