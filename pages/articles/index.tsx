import ArticlesList from "@/components/articles/articlesList";
import SidebarPanel from "@/components/sidebar/sidebarPanel";
import client from "@/tina/client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import classNames from "classnames";
import { TODAY } from "hooks/useFetchEvents";
import { useEffect } from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ArticlesHeader from "../../components/articles/articlesHeader";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { getArticles } from "../../hooks/useFetchArticles";
import { removeExtension } from "../../services/client/utils.service";

export const ARTICLES_QUERY_KEY = "articlesKey";

export default function ArticlesIndexPage(props) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const prop: any = {};
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // eslint-disable-next-line no-console
    console.log(prop.data.nonexistent);
  }, []);
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });
  const { dehydratedState } = props;
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <SEO seo={data.articlesIndex.seo} />
        <Layout
          liveStreamData={props.data.userGroup}
          menu={data.megamenu}
          showAzureBanner={true}
        >
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
                  path={removeExtension(props.variables.relativePath)}
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
              "prose mx-auto w-full max-w-9xl flex-row px-8 pb-8 prose-h1:my-0 prose-h1:pt-8 prose-h2:mt-8 prose-img:my-0",
              data.articlesIndex.fullWidthBody ? "" : "md:flex"
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
        </Layout>
      </HydrationBoundary>
    </>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.articlesIndexContentQuery({
    relativePath: "index.mdx",
    date: TODAY.toISOString(),
  });
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: [ARTICLES_QUERY_KEY],
    queryFn: getArticles,
    initialPageParam: "",
  });
  if (
    tinaProps.data.articlesIndex.seo &&
    !tinaProps.data.articlesIndex.seo.canonical
  ) {
    {
      tinaProps.data.articlesIndex.seo.canonical = `${tinaProps.data.global.header.url}articles`;
    }
    return {
      props: {
        data: tinaProps.data,
        query: tinaProps.query,
        variables: tinaProps.variables,
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
};
