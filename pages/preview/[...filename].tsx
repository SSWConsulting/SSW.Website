import { InferGetStaticPropsType } from "next";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
import { pageBlocks } from "../../components/blocks";
import { Blocks } from "../../components/blocks-renderer";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { BasePage } from "../../page-components/base";
import { removeExtension } from "../../services/client/utils.service";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  // Here due to components attempting to access pageBlock items before
  // they are initialised

  return <BasePage data={data} variables={props.variables} />;
}

export const getStaticProps = async ({ params }) => {
  const relativePath = params.filename.join("/");

  const tinaProps = await client.queries.contentQuery({
    relativePath: `${relativePath}.mdx`,
  });

  if (tinaProps.data.page.seo && !tinaProps.data.page.seo.canonical) {
    tinaProps.data.page.seo.canonical = `${tinaProps.data.global.header.url}${relativePath}`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export const getStaticPaths = async () => {
  let PageListData = await client.queries.pageConnection();
  const allPagesListData = PageListData;

  while (PageListData.data.pageConnection.pageInfo.hasNextPage) {
    const lastCursor = PageListData.data.pageConnection.pageInfo.endCursor;
    PageListData = await client.queries.pageConnection({
      after: lastCursor,
    });

    allPagesListData.data.pageConnection.edges.push(
      ...PageListData.data.pageConnection.edges
    );
  }

  return {
    paths: allPagesListData.data.pageConnection.edges.map((page) => {
      return {
        params: { filename: page.node._sys.breadcrumbs },
      };
    }),
    fallback: false,
  };
};
