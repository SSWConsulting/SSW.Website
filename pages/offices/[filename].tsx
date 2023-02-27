import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";

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
            <Section>
              <Container>
                <h1>{data.offices.heading}</h1>
                <h2>{data.offices.subheading}</h2>
              </Container>
            </Section>
            <div className="mx-auto max-w-9xl px-6 sm:px-8">
              <TinaMarkdown 
                content={data.offices.aboutus}
              />
            </div>
        </Layout>
    )
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.offices({ 
    relativePath: `${params.filename}.mdx`
  });

  console.log(tinaProps.data.offices);

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
