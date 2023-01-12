import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
// import { Blocks } from "../../components/blocks-renderer";
import { Booking } from "../../components/blocks";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";
import React from "react";

export type ConsultingEnv = {
  env: { recaptchaKey?: string };
};
export const ConsultingContext = React.createContext<ConsultingEnv>({
  env: {},
});

export default function ConsultingPage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <ConsultingContext.Provider
      value={{
        env: {
          recaptchaKey: props.env["RECAPTCHA_KEY"],
        },
      }}
    >
      <SEO
        seo={{
          title: data.consulting.title,
          description: data.consulting.description,
        }}
      />
      <Layout>
        <section className="video-mask relative flex min-h-[800px] items-center overflow-hidden text-center font-light text-white">
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
    </ConsultingContext.Provider>
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
      env: {
        RECAPTCHA_KEY: process.env.RECAPTCHA_KEY,
      },
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
