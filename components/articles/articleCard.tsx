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
  key: number;
};

const ArticleCard = (props: ArticleCardProps) => {
  const {
    title,
    body,
    authorImage,
    authorName,
    authorPosition,
    url,
  }: ArticleProps = props.data;
  return (
    <CustomLink
      href={url ?? ""}
      className="unstyled no-underline"
      key={props.key}
    >
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
        <div className="prose-p:mt-0 font-normal">{body}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
