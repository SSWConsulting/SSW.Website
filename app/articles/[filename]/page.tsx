import client from "@/tina/client";
import { TinaClient, UseTinaProps } from "app/tina-client";
import { TODAY } from "hooks/useFetchEvents";
import { useSEO } from "hooks/useSeo";
import { Metadata } from "next";
import ArticlePage, { ArticleData, ArticlePageProps } from ".";
const getData = async (
  filename: string
): Promise<{
  props: UseTinaProps & ArticlePageProps["props"];
}> => {
  const tinaProps = await getArticle(filename);
  tinaProps.data.articlesIndex.title;
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      indexPageTitle: tinaProps.data.articlesIndex.title,
      filename,
    },
  };
};

export async function generateMetadata({
  params,
}: {
  params: { filename: string };
}): Promise<Metadata> {
  const tinaProps = await getArticle(params.filename);
  const seo = tinaProps.data.articles.seo;
  seo.canonical = `${tinaProps.data.global.header.url}articles/${params.filename}`;
  const { seoProps } = useSEO(seo);
  return {
    ...seoProps,
  };
}
const getArticle = async (filename: string): Promise<ArticleData> => {
  const data = await client.queries.articlesContentQuery({
    relativePath: `${filename}.mdx`,
    date: TODAY.toISOString(),
  });
  return data;
};

const Article = async ({ params }: { params: { filename: string } }) => {
  const { props } = await getData(params.filename);

  return <TinaClient Component={ArticlePage} props={props}></TinaClient>;
};

export default Article;
