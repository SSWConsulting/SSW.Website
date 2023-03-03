import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";

import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";

import Image from "next/image";

export default function OfficePage(
    props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
      <Layout>
          <div className="mx-auto max-w-9xl px-6 sm:px-8">
            <div className="h-auto w-auto">
              <Image 
                width={1320}
                height={485}           
                src={data.offices.coverImg}
                alt="Cover image"
              />
            </div>
          </div>
          
          <Container className={"flex-1 pt-4"}>
            <div className="gap-4 md:grid md:grid-cols-5">
              <div className="prose max-w-full md:col-span-4">
                <h1>{data.offices.heading}</h1>
                <h2>{data.offices.subheading}</h2>
                <TinaMarkdown 
                  components={componentRenderer}
                  content={data.offices._body}
                />
              </div>
              <div className="md:col-span-1">
                <p>Test</p>
              </div>
            </div>
          </Container>
      </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.offices({ 
    relativePath: `${params.filename}.mdx`
  });

  return { 
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables
    }
  };
}

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.officesConnection();
  return {
    paths: pagesListData.data.officesConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
