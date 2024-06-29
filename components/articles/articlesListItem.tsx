import { TinaMarkdownContent } from "tinacms/dist/rich-text";

export type ArticlesListItemProps = {
  title: string;
  body: TinaMarkdownContent;
  pageURL: string;
  userName: string;
  userPosition: string;
  userImage: string;
  isExternal: boolean;
};

const ArticlesListItem = ({ data, schema, index }) => {
  const { title, pageURL, body, isExternal, userName, userPosition, userImage }: ArticlesListItemProps = data;

  return
  <>
  </>
};

export default ArticlesListItem;
