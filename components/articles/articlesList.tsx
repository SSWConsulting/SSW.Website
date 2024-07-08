import ArticleCard from "./articleCard";

const ArticlesList = ({ listItemProps, schema }) => {
  if (!listItemProps) return null;
  const listItems = listItemProps.map((p, i) => (
    <ArticleCard key={i} data={p} schema={schema} index={i} />
  ));

  return <div className="flex w-full flex-col">{listItems}</div>;
};

export default ArticlesList;
