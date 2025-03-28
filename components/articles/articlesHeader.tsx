import { tinaField } from "tinacms/dist/react";
import { Section } from "../util/section";

export const articlesIndexSchemaConstants = {
  value: "articlesIndex",
  title: "title",
  headerImage: {
    value: "headerImage",
    heroBackground: "heroBackground",
    altText: "altText",
    txtOverlay: "txtOverlay",
  },
  _body: "_body",
  articles: {
    value: "articles",
    title: "title",
    body: "body",
    pageURL: "pageURL",
    isExternal: "isExternal",
    userName: "userName",
    userPosition: "userPosition",
    userImage: "userImage",
  },
};

const ArticlesHeader = ({ data, schema }) => {
  return (
    <Section
      className="flex h-102 items-center justify-center border-b-8 border-sswRed bg-white bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${
          data?.heroBackground || "/images/polygonBackground.png"
        })`,
      }}
      data-tina-field={tinaField(
        schema,
        articlesIndexSchemaConstants.headerImage.heroBackground
      )}
    >
      {data?.txtOverlay && (
        <div
          className="flex max-w-2xl text-white lg:max-w-3xl"
          data-tina-field={tinaField(
            schema,
            articlesIndexSchemaConstants.headerImage.txtOverlay
          )}
        >
          <h1 className="text-white">{data.txtOverlay}</h1>
        </div>
      )}
    </Section>
  );
};

export default ArticlesHeader;
