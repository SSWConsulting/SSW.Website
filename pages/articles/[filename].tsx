import { Breadcrumbs } from "@/blocks/breadcrumbs";
import { componentRenderer } from "@/blocks/mdxComponentRenderer";
import ArticleAuthor from "@/components/articles/articleAuthor";
import { BuiltOnAzure } from "@/components/blocks";
import { CallToAction } from "@/components/callToAction/callToAction";
import { Layout } from "@/components/layout";
import SidebarPanel from "@/components/sidebar/sidebarPanel";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { SEO } from "@/components/util/seo";
import { removeExtension } from "@/services/client/utils.service";
import client from "@/tina/client";
import classNames from "classnames";
import { TODAY } from "hooks/useFetchEvents";
import { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ArticlesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const { author } = data.articles;

  return (
    <div>
      <SEO seo={props.seo} />

      <Layout liveStreamData={props.data.userGroup} menu={data.megamenu}>
        {data.articles.bannerImg && (
          <Container className="prose flex-1" size="custom">
            <div data-tina-field={tinaField(data.articles, "bannerImg")}>
              <Image
                src={data.articles.bannerImg}
                width={1312}
                height={0}
                alt="SSW Industry Banner"
                sizes="100vw"
              />
            </div>
          </Container>
        )}
        {data.articles.seo?.showBreadcrumb === null ||
          (data.articles.seo?.showBreadcrumb && (
            <Section className="mx-auto w-full max-w-9xl px-8 py-5">
              <Breadcrumbs
                path={removeExtension(props.variables.relativePath)}
                suffix={data.global.breadcrumbSuffix}
                title={data.articles.seo?.title}
                seoSchema={data.articles.seo}
              />
            </Section>
          ))}

        {data.articles.title && (
          <Section
            className="mx-auto w-full max-w-9xl px-8"
            data-tina-field={tinaField(data.articles, "title")}
          >
            <h1 data-tina-field={tinaField} className="mt-4 py-2">
              {data.articles.title}
            </h1>
          </Section>
        )}
        {!!data.articles.author && (
          <Section className="mx-auto w-full max-w-9xl px-8">
            <ArticleAuthor
              name={author?.presenter?.name}
              position={author?.position}
              image={author?.profileImg}
              url={author?.presenter?.peopleProfileURL}
            />
          </Section>
        )}
        {data.articles.subTitle && (
          <section
            className={classNames(
              "prose mx-auto w-full max-w-9xl flex-row px-8 pb-8 prose-h1:my-0 prose-h1:pt-8 prose-h2:mt-8 prose-img:my-0 lg:flex"
            )}
          >
            <div data-tina-field={tinaField(data.articles, "subTitle")}>
              <TinaMarkdown
                content={data.articles.subTitle}
                components={componentRenderer}
              />
            </div>
            {data.articles.sidebarPanel?.showSidebarPanel && (
              <div className="w-full px-16 lg:shrink lg:pl-16 lg:pr-0">
                <SidebarPanel
                  title={data.articles.sidebarPanel?.title}
                  tinaFields={{
                    title: tinaField(data.articles.sidebarPanel, "title"),
                    description: tinaField(
                      data.articles.sidebarPanel,
                      "description"
                    ),
                  }}
                  description={data.articles.sidebarPanel?.description}
                  actionUrl={data.articles.sidebarPanel?.actionUrl}
                  actionText={data.articles.sidebarPanel?.actionText}
                />
              </div>
            )}
          </section>
        )}

        {data.articles.callToAction?.showCallToAction && (
          <CallToAction
            animated={data.articles?.callToAction?.animated}
            tinaFields={{
              subTitle: tinaField(data.articles?.callToAction, "subTitle"),
              buttonSubtitle: tinaField(
                data.articles?.callToAction,
                "buttonSubtitle"
              ),
            }}
            subTitle={data.articles?.callToAction?.subTitle}
            buttonText={data.articles?.callToAction?.buttonText}
            buttonSubtitle={data.articles?.callToAction?.buttonSubtitle}
          >
            {data.articles?.callToAction?.title && (
              <h2
                className="callToAction"
                data-tina-field={tinaField(
                  data.articles?.callToAction,
                  "title"
                )}
              >
                {data.articles?.callToAction?.title}
              </h2>
            )}
          </CallToAction>
        )}
        <Section>
          <BuiltOnAzure data={{ backgroundColor: "default" }} />
        </Section>
      </Layout>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.articlesContentQuery({
    relativePath: `${params.filename}.mdx`,
    date: TODAY.toISOString(),
  });

  const seo = tinaProps.data.articles.seo;
  if (seo && (seo?.canonical === null || seo?.canonical === "")) {
    seo.canonical = `${tinaProps.data.global.header.url}articles/${params.filename}`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      env: {
        GOOGLE_RECAPTCHA_SITE_KEY:
          process.env.GOOGLE_RECAPTCHA_SITE_KEY || null,
      },
      seo,
    },
  };
};
export const getStaticPaths = async () => {
  let pageListData = await client.queries.articlesConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.articlesConnection.pageInfo.hasNextPage) {
    const lastCursor = pageListData.data.articlesConnection.pageInfo.endCursor;
    pageListData = await client.queries.articlesConnection({
      after: lastCursor,
    });

    allPagesListData.data.articlesConnection.edges.push(
      ...pageListData.data.articlesConnection.edges
    );
  }
  return {
    paths: allPagesListData.data.articlesConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
