import { getSEOProps } from "@/lib/seo";
import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { TinaClient, UseTinaProps } from "app/tina-client";
import { Metadata } from "next";
import ArticlePage, { ArticleData, ArticlePageProps } from ".";

type Articles = Awaited<ReturnType<typeof client.queries.articlesConnection>>;

const getData = async (
  filename: string
): Promise<{
  props: UseTinaProps & ArticlePageProps["props"];
}> => {
  const tinaProps = await getArticle(filename);
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

export async function generateStaticParams(): Promise<{ filename: string }[]> {
  const articles: Articles = await client.queries.articlesConnection();
  return articles.data.articlesConnection.edges.map((edge) => {
    return { filename: edge.node._sys.filename };
  });
}
export async function generateMetadata(props: {
  params: Promise<{ filename: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const tinaProps = await getArticle(params.filename);
  const seo = tinaProps.data.articles.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}articles/${params.filename}`;
  }

  return getSEOProps(seo);
}
const getArticle = async (filename: string): Promise<ArticleData> => {
  const tinaProps = await fetchTinaData(
    client.queries.articlesContentQuery,
    filename
  );

  return tinaProps;
};

const Article = async (prop: { params: Promise<{ filename: string }> }) => {
  const params = await prop.params;
  const { props } = await getData(params.filename);

  return <TinaClient Component={ArticlePage} props={props}></TinaClient>;
};

export default Article;
