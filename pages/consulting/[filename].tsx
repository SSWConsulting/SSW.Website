import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
// import { Blocks } from "../../components/blocks-renderer";
import { Booking } from "../../components/blocks";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

export default function ConsultingPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });
  
  return (
    <>
      <SEO
        seo={
          {
            title: data.consulting.title,
            description: data.consulting.description,
          }
        }
      />
      <Layout>
        <section className="flex items-center relative text-center min-h-[800px] overflow-hidden text-white font-light video-mask">
          <Booking {...data.consulting.booking}></Booking>
        </section>
        <Container className={`prose`}>
          <a id="more" />
          <TinaMarkdown
            components={componentRenderer}
            content={data.consulting._body}
          />
        </Container>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.consultingContentQuery({
    relativePath: `${params.filename}.mdx`,
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
  const pagesListData = await client.queries.consultingConnection();
  return {
    paths: pagesListData.data.consultingConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
