import ArticleCard from "./articleCard";

const ArticlesList = ({ articles }) => {
  const listItems = articles.map((p, i) => (
    <ArticleCard data={p} key={i} />
  ));

  return <div className="flex w-full flex-col">{listItems}</div>;
};

export default ArticlesList;
