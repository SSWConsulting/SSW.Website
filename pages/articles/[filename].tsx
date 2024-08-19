import { Breadcrumbs } from "@/blocks/breadcrumbs";
import { componentRenderer } from "@/blocks/mdxComponentRenderer";
import ArticleAuthor from "@/components/articles/articleAuthor";
import { Layout } from "@/components/layout";
import SidebarPanel from "@/components/sidebar/sidebarPanel";
import { Section } from "@/components/util/section";
import { SEO } from "@/components/util/seo";
import { removeExtension } from "@/services/client/utils.service";
import client from "@/tina/client";
import classNames from "classnames";
import { InferGetStaticPropsType } from "next";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { BookingButton, BuiltOnAzure } from "@/components/blocks";
import { Container } from "@/components/util/container";
import Image from "next/image";

export default function ArticlesPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });
  const { author } = data.articles;
  const bookingButtonProps = {
    buttonText: data.global.bookingButtonText,
  };

  return (
    <div>
      <SEO seo={props.seo} />

      <Layout menu={data.megamenu} footerColor="default">
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
            <h1 className="mt-4 py-2">{data.articles.title}</h1>
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
            {data.articles.showSidebarPanel && (
              <div className="w-full px-16 lg:shrink lg:pl-16 lg:pr-0">
                <SidebarPanel
                  title={data.articles.sidebarPanel.title}
                  description={data.articles.sidebarPanel.description}
                  actionUrl={data.articles.sidebarPanel.actionUrl}
                  actionText={data.articles.sidebarPanel.actionText}
                />
              </div>
            )}
          </section>
        )}
        <Section className="!bg-gray-75 pb-25 text-center">
          <Container size="custom" className="w-full">
            <h1 data-tina-field={tinaField(data.articles, "callToAction")}>
              {data.articles.callToAction ?? "Talk to us about your project"}
            </h1>
            <p className="text-lg">
              Connect with our Account Managers to discuss how we can help.
            </p>
            <BookingButton data={bookingButtonProps} />
          </Container>
        </Section>
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
