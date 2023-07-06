import { InferGetStaticPropsType } from "next";

import { useTina } from "tinacms/dist/react";
import { client } from "../../../.tina/__generated__/client";

import { Layout } from "../../../components/layout";

export default function VideoProductionPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <Layout>
      <h1>TEST</h1>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.videoProductionContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  //const canonical = `${tinaProps.data.global.header.url}consulting/videoproduction/${params.filename}`;
  //const seo = tinaProps.data.videoProduction.seo;
  //if (seo) {
  //  seo.canonical = canonical;
  //}

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      //env: {
      //  GOOGLE_RECAPTCHA_SITE_KEY:
      //    process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
      //},
      //seo,
    },
  };
};

export const getStaticPaths = async () => {
  let pageListData = await client.queries.videoProductionConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.videoProductionConnection.pageInfo.hasNextPage) {
    const lastCursor =
      pageListData.data.videoProductionConnection.pageInfo.endCursor;
    pageListData = await client.queries.videoProductionConnection({
      after: lastCursor,
    });

    allPagesListData.data.videoProductionConnection.edges.push(
      ...pageListData.data.videoProductionConnection.edges
    );
  }

  return {
    paths: allPagesListData.data.videoProductionConnection.edges.map(
      (page) => ({
        params: { filename: page.node._sys.filename },
      })
    ),
    fallback: false,
  };
};
