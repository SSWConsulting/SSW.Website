import { CustomLink } from "../customLink";
import ArticleAuthor from "./articleAuthor";

export type ArticleCardProps = {
  title: string;
  body: string;
  pageURL: string;
  userName: string;
  userPosition: string;
  userImage: string;
  isExternal: boolean;
};

const ArticleCard = ({ data, schema, index }) => {
  const {
    title,
    pageURL,
    body,
    isExternal,
    userName,
    userImage,
    userPosition,
  }: ArticleCardProps = data;

  return isExternal ? (
    <CustomLink
      href={pageURL ?? ""}
      className="unstyled no-underline"
      key={pageURL}
    >
      <ArticleCardContent
        title={title}
        body={body}
        userImage={userImage}
        userName={userName}
        userPosition={userPosition}
      />
    </CustomLink>
  ) : (
    <CustomLink
      href={pageURL ?? ""}
      className="unstyled no-underline"
      key={pageURL}
    >
      <ArticleCardContent
        title={title}
        body={body}
        userImage={userImage}
        userName={userName}
        userPosition={userPosition}
      />
    </CustomLink>
  );
};

const ArticleCardContent = ({
  title,
  body,
  userName,
  userImage,
  userPosition
}) => {
  return (
    <div className="size-full bg-white">
      <div>
        <h2 className="my-1">
          {title}
        </h2>
        <ArticleAuthor name={userName} position={userPosition} image={userImage} />
        <div className="prose-p:mt-0 font-normal">
          {body}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
