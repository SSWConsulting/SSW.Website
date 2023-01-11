import { useTina } from "tinacms/dist/react";
import { Components, TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../../.tina/__generated__/client";
// import { Blocks } from "../../components/blocks-renderer";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import ReactPlayer from "react-player";

const consultingComponentRenderer: Components<Record<string, unknown>> = {
  code: (data) => {
    const { children: { props: { type, text } } } = data;
    if (type === "text" && text.startsWith("youtube:")) {
      const link = text.replace("youtube:", "").trim();
      return (
        <div className="relative my-8 mx-auto h-[400px] w-[800px]">
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
        <Section
          color="black"
          // https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/186
          // eslint-disable-next-line tailwindcss/no-contradicting-classname
          className={`
            prose-consulting
            mx-auto min-w-full max-w-[1170px]
            overflow-hidden border-y-4
            border-y-sswRed bg-black
            bg-[url('/consulting/mvc-benefits-bg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat px-4
            py-[100px] text-center text-white`
          }
        >
          <TinaMarkdown
            components={{ ...componentRenderer, ...consultingComponentRenderer }}
            content={data.consulting._body}
          />
        </Section>
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
