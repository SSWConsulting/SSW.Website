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
      {hasMoreArticles && (
        <LoadMore isLoading={isFetchingArticles} load={fetchMoreArticles} />
      )}
    </div>
  );
};

export default ArticlesList;
