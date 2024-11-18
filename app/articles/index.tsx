"use client";

import ArticleAuthor from "@/components/articles/articleAuthor";
import ArticlesHeader from "@/components/articles/articlesHeader";
import ArticlesList from "@/components/articles/articlesList";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { CallToAction } from "@/components/callToAction/callToAction";
import SidebarPanel from "@/components/sidebar/sidebarPanel";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { ArticlesIndexContentQueryQuery } from "@/tina/types";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";
import { Breadcrumbs } from "app/components/breadcrumb";
import { QueryProvider } from "app/providers/query-provider";
import classNames from "classnames";
import Image from "next/image";
import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
// import { ArticlesIndexContentResponse } from "./page";

// export type ArticlesindexPageProps = {
//   tinaProps: {
//     data: ArticlesIndexContentResponse["data"];
//   };
//   props: { dehydratedState: DehydratedState; relativePath: string };
// };

function ArticlesIndexPage({ props, tinaProps }) {
  const { data } = tinaProps;
  data.articlesIndex;
  data.articlesIndex.seo;
  const { dehydratedState } = props;
  console.log("dehydrated state", dehydratedState);
  return (
    <>
      <QueryProvider>
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
                <Breadcrumbs
                  path={removeExtension(props.relativePath)}
                  suffix={data.global.breadcrumbSuffix}
                  title={data.articlesIndex.seo?.title}
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
              "prose mx-auto w-full max-w-9xl flex-row px-8 pb-8 prose-h1:my-0 prose-h1:pt-8 prose-h2:mt-8 prose-img:my-0"
            )}
          >
            {data.articlesIndex._body.children.length > 0 && (
              <div data-tina-field={tinaField(data.articlesIndex, "_body")}>
                <TinaMarkdown
                  components={componentRenderer}
                  content={data.articlesIndex._body}
                />

                <Section className="mx-auto w-full">
                  <ArticlesList />
                </Section>
              </div>
            )}
            {data.articlesIndex.showSidebarPanel && (
              <div className="w-full px-16 pt-16 md:max-w-sm md:pt-0 lg:shrink lg:pl-16 lg:pr-0">
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
        </HydrationBoundary>
      </QueryProvider>
    </>
  );
}

export default ArticlesIndexPage;
