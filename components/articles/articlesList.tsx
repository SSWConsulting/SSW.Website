import ArticlesListItem from "./articlesListItem";

const ArticlesList = ({ listItemProps, schema }) => {
  if (!listItemProps) return null;
  const listItems = listItemProps.map((p, i) => (
    <ArticlesListItem key={i} data={p} schema={schema} index={i} />
  ));

  return (
    <div className="mx-auto mb-2 grid w-full max-w-9xl grid-cols-1 gap-3 rounded py-8 md:grid-cols-2 md:p-8">
      {listItems}
    </div>
  );
};

export default ArticlesList;
