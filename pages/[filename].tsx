import { Blocks } from "../components/blocks-renderer";
import { useTina } from "tinacms/dist/react";
import { client } from "../.tina/__generated__/client";
import { Layout } from "../components/layout";
import { NextSeoProps } from "next-seo";
import { SEO } from "../components/util/seo";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });
  return (
    <>
      <SEO seo={{
        title: data.page.title,
        description: data.page.description,
      } as Partial<NextSeoProps>} />
      <Layout data={data.global as any}>
        <Blocks {...data.page} />
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`,
  });
  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    },
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;
