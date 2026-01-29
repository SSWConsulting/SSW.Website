import { CustomLink } from "../customLink";
import ArticleAuthor from "./articleAuthor";
import ArticleDate from "./articleDate";

export type ArticleProps = {
  title: string;
  url: string;
  body: string;
  authorName: string | null;
  authorPosition: string | null;
  authorImage: string | null;
  publishedDate?: string;
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
    publishedDate,
  }: ArticleProps = data;
  return (
    <CustomLink href={url ?? ""} className="unstyled no-underline">
      <ArticleCardContent
        title={title}
        body={body}
        userImage={authorImage}
        userName={authorName}
        userPosition={authorPosition}
        publishedDate={publishedDate}
      />
    </CustomLink>
  );
};

type ArticleCardContentProps = {
  title: string;
  body: string;
  userName: string | null;
  userImage: string | null;
  userPosition: string | null;
  publishedDate?: string;
};

const ArticleCardContent = ({
  title,
  body,
  userName,
  userImage,
  userPosition,
  publishedDate,
}: ArticleCardContentProps) => {
  return (
    <div className="size-full bg-white">
      <div>
        <h2 className="my-1">{title}</h2>
        <div className="flex flex-row items-center gap-2 py-1">
          <ArticleAuthor
            name={userName}
            position={userPosition}
            image={userImage}
          />
          <ArticleDate publishedDate={publishedDate} />
        </div>
        <div className="font-normal prose-p:mt-0">{body}</div>
      </div>
    </div>
  );
};

export default ArticleCard;
