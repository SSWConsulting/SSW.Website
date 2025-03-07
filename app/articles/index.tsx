"use client";

import ArticlesHeader from "@/components/articles/articlesHeader";
import ArticlesList from "@/components/articles/articlesList";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { SidebarPanel } from "@/components/sidebar/sidebarPanel";
import { Section } from "@/components/util/section";
import client from "@/tina/client";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { Breadcrumbs } from "app/components/breadcrumb";
import classNames from "classnames";
import React from "react";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

type ArticlesIndexPageProps = {
  props: {
    dehydratedState: DehydratedState;
    relativePath: string;
  };
  tinaProps: {
    data: Awaited<
      ReturnType<typeof client.queries.articlesIndexContentQuery>
    >["data"];
  };
};

function ArticlesIndexPage({ props, tinaProps }: ArticlesIndexPageProps) {
  const { data } = tinaProps;
  const { dehydratedState } = props;
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        {data.articlesIndex.headerImage?.heroBackground && (
          <Section className="mx-auto hidden w-full sm:block">
            <ArticlesHeader
              data={data.articlesIndex.headerImage}
              schema={data.articlesIndex.headerImage}
            />
          </Section>
        )}
        {data.articlesIndex.seo?.showBreadcrumb === null ||
          (data.articlesIndex.seo?.showBreadcrumb && (
            <Section className="mx-auto w-full max-w-9xl px-8 py-5">
              <></>
              <Breadcrumbs
                path={"articles"}
                title={data.articlesIndex.title}
                seoSchema={data.articlesIndex.seo}
              />
            </Section>
          ))}
        <Section className="mx-auto w-full max-w-9xl px-8 pb-4 pt-2">
          <h1
            className="mt-0 py-2"
            data-tina-field={tinaField(data.articlesIndex, "title")}
          >
            {data.articlesIndex.title}
          </h1>
        </Section>
        <section
          className={classNames(
            "prose mx-auto w-full max-w-9xl flex-row px-8 pb-8 prose-h1:my-0 prose-h1:pt-8 prose-h2:mt-8 prose-img:my-0 md:flex"
          )}
        >
          {data.articlesIndex._body.children.length > 0 && (
            <div>
              <section data-tina-field={tinaField(data.articlesIndex, "_body")}>
                <TinaMarkdown
                  components={componentRenderer}
                  content={data.articlesIndex._body}
                />
              </section>

              <Section className="mx-auto w-full">
                <ArticlesList />
              </Section>
            </div>
          )}
          {data.articlesIndex.showSidebarPanel && (
            <div className="w-full pt-16 md:max-w-sm md:px-16 md:pt-0 lg:shrink lg:pl-16 lg:pr-0">
              <SidebarPanel
                title={data.articlesIndex.sidebarPanel.title}
                description={data.articlesIndex.sidebarPanel.description}
                actionUrl={data.articlesIndex.sidebarPanel.actionUrl}
                actionText={data.articlesIndex.sidebarPanel.actionText}
                tinaFields={{
                  title: tinaField(data.articlesIndex.sidebarPanel, "title"),
                  description: tinaField(
                    data.articlesIndex.sidebarPanel,
                    "description"
                  ),
                }}
              />
            </div>
          )}
        </section>
        <PreFooter data={data.articlesIndex.azureBanner} />
      </HydrationBoundary>
    </>
  );
}

export default ArticlesIndexPage;
