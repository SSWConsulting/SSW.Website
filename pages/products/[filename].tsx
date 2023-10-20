import { InferGetStaticPropsType } from "next";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { removeExtension } from "../../services/client/utils.service";

export default function OfficePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <>
      <SEO seo={data.products.seo} />
      <Layout>
        <Section className="mx-auto w-full max-w-9xl px-8 pt-5">
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.products.seo?.title}
          />
        </Section>
        <Container
          className={
            "prose flex-1 pt-4 prose-h1:!my-0 prose-h1:!pt-4 prose-h3:!mt-0 prose-img:!my-0"
          }
        >
          <TinaMarkdown
            content={data.products._body}
            components={componentRenderer}
          />
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.productContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  if (tinaProps.data.products.seo && !tinaProps.data.products.seo.canonical) {
    tinaProps.data.products.seo.canonical = `${tinaProps.data.global.header.url}products/${params.filename}`;
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
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: "blocking",
    };
  }

  let PageListData = await client.queries.productsConnection();
  const allPagesListData = PageListData;

  while (PageListData.data.productsConnection.pageInfo.hasNextPage) {
    const lastCursor = PageListData.data.productsConnection.pageInfo.endCursor;
    PageListData = await client.queries.productsConnection({
      after: lastCursor,
    });

    allPagesListData.data.productsConnection.edges.push(
      ...PageListData.data.productsConnection.edges
    );
  }
  return {
    paths: allPagesListData.data.productsConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
