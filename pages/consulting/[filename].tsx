import { useTina } from "tinacms/dist/react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
// import { Blocks } from "../../components/blocks-renderer";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Benefits } from "../../components/util/consulting/benefits";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import ReactPlayer from "react-player";

const consultingComponentRenderer: Components<{}> = {
  code: (data) => {
    const { children: { props: { type, text } } } = data;
    if (type === "text" && text.startsWith("youtube:")) {
      const link = text.replace("youtube:", "").trim();
      return (
        <div className="my-8 mx-auto relative h-[400px] w-[800px]">
          <ReactPlayer
            className="absolute top-0 left-0"
            url={link}
            width={"100%"}
            height={"100%"}
          />
        </div>
      )
    }
    return <code>{data.children}</code>
  }
};

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
      <SEO seo={data.consulting.seo} />
      <Layout>
        {/* <Container className="prose"> */}
        <Section
          color="black"
          className={`
            prose-cp
            mx-auto px-4 py-[100px]
            max-w-[1170px] min-w-full
            text-center text-white
            bg-fixed bg-black bg-center bg-no-repeat bg-cover bg-[url('/consulting/mvc-benefits-bg.jpg')]
            border-y-4 border-y-sswRed overflow-hidden`
          }
        >
          <TinaMarkdown
            components={{ ...componentRenderer, ...consultingComponentRenderer }}
            content={data.consulting._body}
          />
          <Benefits data={data.consulting.benefits}></Benefits>
        </Section>
        {/* </Container> */}
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
