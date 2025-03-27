"use client";
import ArticleAuthor from "@/components/articles/articleAuthor";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { CallToAction } from "@/components/callToAction/callToAction";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { SidebarPanel } from "@/components/sidebar/sidebarPanel";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import client from "@/tina/client";
import { Breadcrumbs } from "app/components/breadcrumb";
import classNames from "classnames";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
export type ArticleData = Awaited<
  ReturnType<typeof client.queries.articlesContentQuery>
>;

export type ArticlePageProps = {
  tinaProps: { data: ArticleData["data"] };
  props: { filename: string; indexPageTitle: string };
};

const ArticlePage = ({ props, tinaProps }: ArticlePageProps) => {
  const { data } = tinaProps;
  const { author } = data.articles;
  return (
    <>
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
              path={props.filename}
              title={data.articles.seo?.title}
              seoSchema={data.articles.seo}
              additionalReplacements={[
                {
                  from: "articles",
                  to: props.indexPageTitle,
                },
              ]}
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
              data-tina-field={tinaField(data.articles?.callToAction, "title")}
            >
              {data.articles?.callToAction?.title}
            </h2>
          )}
        </CallToAction>
      )}
      <PreFooter
        data={
          data.articles?.azureBanner?.azureFooterColor
            ? data.articles.azureBanner
            : {
                azureFooterColor: "white",
              }
        }
      />
    </>
  );
};

export default ArticlePage;
