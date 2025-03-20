import { fetchTinaData } from "@/services/tina/fetchTinaData";
import client from "@/tina/client";
import { TinaClient, UseTinaProps } from "app/tina-client";
import { useSEO } from "hooks/useSeo";
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

export async function generateMetadata({
  params,
}: {
  params: { filename: string };
}): Promise<Metadata> {
  const tinaProps = await getArticle(params.filename);
  const seo = tinaProps.data.articles.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}articles/${params.filename}`;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { seoProps } = useSEO(seo);
  return {
    ...seoProps,
  };
}
const getArticle = async (filename: string): Promise<ArticleData> => {
  const tinaProps = await fetchTinaData(
    client.queries.articlesContentQuery,
    filename
  );

  return tinaProps;
};

const Article = async ({ params }: { params: { filename: string } }) => {
  const { props } = await getData(params.filename);

  return <TinaClient Component={ArticlePage} props={props}></TinaClient>;
};

export default Article;
