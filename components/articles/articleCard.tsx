import { articlesIndexSchemaConstants } from "@/tina-collections/articles";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { CustomLink } from "../customLink";

export type ArticleCardProps = {
  title: string;
  body: TinaMarkdownContent;
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
        schema={schema}
        index={index}
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
        schema={schema}
        index={index}
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
  schema,
  index,
}) => {
  return (
    <div className="size-full bg-white">
      <div>
        <h2
          className="my-1"
          data-tina-field={tinaField(
            schema[index],
            articlesIndexSchemaConstants.articles.title
          )}
        >
          {title}
        </h2>
        <div className="flex flex-row items-center gap-2 py-1">
          <Image
            src={userImage}
            alt="User Photo"
            width={40}
            height={40}
            className="size-10 rounded-full"
          />
          <div className="font-semibold uppercase">{userName}</div>
          <div className="font-semibold">|</div>
          <div className="text-sm uppercase text-gray-500">{userPosition}</div>
        </div>
        <div
          className="prose-p:mt-0"
          data-tina-field={tinaField(
            schema[index],
            articlesIndexSchemaConstants.articles.body
          )}
        >
          <TinaMarkdown content={body} />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
