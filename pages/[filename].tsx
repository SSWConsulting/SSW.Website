import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../.tina/__generated__/client";
import { Blocks } from "../components/blocks-renderer";
import { Breadcrumbs } from "../components/blocks/breadcrumbs";
import { componentRenderer } from "../components/blocks/mdxComponentRenderer";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { SEO } from "../components/util/seo";

export default function HomePage(
  props: AsyncReturnType<typeof getStaticProps>["props"]
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const removeExtension = (file: string) => {
    return file.split(".")[0];
  };

  const contentClass = data.page.sideBar
    ? "max-w-full md:col-span-3 prose"
    : "max-w-full md:col-span-5 prose";

  return (
    <>
      <SEO seo={data.page.seo} />
      <Layout>
        {data.page.breadcrumbs ? (
          <Section className="mx-auto -mb-20 w-full max-w-9xl px-8 py-5">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              suffix={data.global.breadcrumbSuffix}
              title={data.page.seo?.title}
            />
          </Section>
        ) : (
          <></>
        )}
        <Blocks prefix="PageBeforeBody" blocks={data.page.beforeBody} />
        <Container className={"flex-1 pt-4"}>
          <div className="gap-4 md:grid md:grid-cols-5">
            <div className={contentClass}>
              <TinaMarkdown
                components={componentRenderer}
                content={data.page._body}
              />
            </div>
            {!!data.page.sideBar && (
              <div className="md:col-span-2">
                <Blocks prefix="PageSideBar" blocks={data.page.sideBar} />
              </div>
            )}
          </div>
        </Container>
        <div className="no-print">
          <Blocks prefix="PageAfterBody" blocks={data.page.afterBody} />
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.contentQuery({
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
    paths: allPagesListData.data.pageConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = // eslint-disable-line @typescript-eslint/no-explicit-any
  T extends (...args: any) => Promise<infer R> ? R : any; // eslint-disable-line @typescript-eslint/no-explicit-any
