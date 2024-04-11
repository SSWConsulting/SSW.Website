import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import classNames from "classnames";
import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import { WebSite, WithContext } from "schema-dts";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { client } from "@/tina//client";
import { pageBlocks } from "../components/blocks";
import { Breadcrumbs } from "../components/blocks/breadcrumbs";
import { Layout } from "../components/layout";
import { Container } from "../components/util/container";
import { Section } from "../components/util/section";
import { SEO } from "../components/util/seo";
import { removeExtension } from "../services/client/utils.service";

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const structuredData: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: props?.data.global?.header.site_name,
    alternateName: props?.data.global?.header?.alternate_site_name,
    description: props?.data.global.header.description,
    url: props?.data.global.header.url,
  };

  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

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
      {props.variables?.relativePath === "home.mdx" && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
      )}

      <SEO seo={data.page.seo} />
      <Layout menu={data.megamenu} showAzureBanner={data.page.showAzureFooter}>
        {data.page.breadcrumbs && (
          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              suffix={data.global.breadcrumbSuffix}
              title={data.page.seo?.title}
            />
          </Section>
        )}
        {data.page?.title && (
          <Section
            className="mx-auto w-full max-w-9xl px-8"
            data-tina-field={tinaField(data.page, "title")}
          >
            <h1 className="mt-4 py-2">{data.page.title}</h1>
          </Section>
        )}
        {data.page?.subTitle && (
          <Section
            className="mx-auto w-full max-w-9xl px-8"
            data-tina-field={tinaField(data.page, "title")}
          >
            <span>
              <TinaMarkdown
                content={data.page?.subTitle}
                data-tina-field={tinaField(data.page, "subTitle")}
                components={componentRenderer}
              />
            </span>
          </Section>
        )}
        <Blocks prefix="PageBeforeBody" blocks={data.page.beforeBody} />
        <Container
          className={classNames("flex-1", {
            "pt-0": data.page.removeBodyTopMargin,
          })}
        >
          <div className="gap-20 pt-3 md:grid md:grid-cols-5">
            <div
              className={classNames(contentClass, {
                "text-center": data.page.centeredBodyText,
              })}
              data-tina-field={tinaField(data.page, "_body")}
            >
              <TinaMarkdown
                content={data.page._body}
                components={componentRenderer}
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
