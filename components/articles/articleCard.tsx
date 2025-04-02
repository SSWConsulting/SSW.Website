import { CustomLink } from "../customLink";
import ArticleAuthor from "./articleAuthor";

export type ArticleProps = {
  title: string;
  url: string;
  body: string;
  authorName: string | null;
  authorPosition: string | null;
  authorImage: string | null;
};

export type ArticleCardProps = {
  data: ArticleProps;
};

const ArticleCard = ({ data }: ArticleCardProps) => {
  const {
    title,
    body,
    authorImage,
    authorName,
    authorPosition,
    url,
  }: ArticleProps = data;
  return (
    <CustomLink href={url ?? ""} className="unstyled no-underline">
      <ArticleCardContent
        title={title}
        body={body}
        userImage={authorImage}
        userName={authorName}
        userPosition={authorPosition}
      />
    </CustomLink>
  );
};

const ArticleCardContent = ({
  title,
  body,
  userName,
  userImage,
  userPosition,
}) => {
  return (
    <div className="size-full bg-white">
      <div>
        <h2 className="my-1">{title}</h2>
        <ArticleAuthor
          name={userName}
          position={userPosition}
          image={userImage}
        />
        <div className="font-normal prose-p:mt-0">{body}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
