import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { client } from "../.tina/__generated__/client";
import { pageBlocks } from "../components/blocks";
import { Blocks } from "../components/blocks-renderer";
import { Breadcrumbs } from "../components/blocks/breadcrumbs";
import { componentRenderer } from "../components/blocks/mdxComponentRenderer";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { SEO } from "../components/util/seo";
import { removeExtension } from "../services/client/utils.service";

const tinaField = (json: any, str: string) => {
  return str;
};

export default function HomePage({
  data,
  ...props
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // Here due to components attempting to access pageBlock items before
  // they are initialised
  if (!pageBlocks) {
    return null;
  }

  const contentClass = data.page.sideBar
    ? "max-w-full md:col-span-3 prose prose-h2:text-3xl/9 prose-h2:text-black"
    : "max-w-full md:col-span-5 prose prose-h2:text-3xl/9 prose-h2:text-black";

  return (
    <>
      <SEO seo={data.page.seo} />
      <Layout menu={data.megamenu}>
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
        <Container className="flex-1">
          <div className="gap-20 pt-3 md:grid md:grid-cols-5">
            <div
              className={contentClass}
              data-tina-field={tinaField(data.page, "_body")}
            >
              <TinaMarkdown
                components={componentRenderer}
                content={data.page._body}
              />
            </div>

            {!!data.page.sideBar && (
              <div className="mt-5 md:col-span-2 md:mt-0">
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
