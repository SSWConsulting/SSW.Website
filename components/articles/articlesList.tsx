import ArticleCard from "./articleCard";

const ArticlesList = ({ listItemProps, schema }) => {
  if (!listItemProps) return null;
  const listItems = listItemProps.map((p, i) => (
    <ArticleCard key={i} data={p} schema={schema} index={i} />
  ));

  return (
    <div className="flex flex-col w-full">
      {listItems}
    </div>
  );
};

export default ArticlesList;
