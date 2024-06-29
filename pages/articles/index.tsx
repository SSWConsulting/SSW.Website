import MicroservicesPanel from "@/components/microservices/microservicesPanel";
import client from "@/tina/client";
import classNames from "classnames";
import { InferGetStaticPropsType } from "next";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ArticlesHeader from "../../components/articles/articlesHeader";
import { ArticlesIndexProps } from "../../components/articles/articlesListItem";
import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { removeExtension } from "../../services/client/utils.service";

export default function ArticlesIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const articlesPageProps =
    data.articlesIndex?.articlesPages?.map<ArticlesIndexProps>((m) => ({
      title: m.title,
      body: m.body,
      pageURL: m.pageURL,
      isExternal: m.isExternal,
    })) || [];

  return (
    <div>
      <SEO seo={props.seo} />
      <Layout menu={data.megamenu}>
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

            {data.articlesIndex.companyPages?.length > 0 ? (
              <Section className="mx-auto !bg-gray-100 px-8">
                <CompanyPages
                  cardProps={companyPageProps}
                  schema={data.companyIndex.companyPages}
                />
              </Section>
            ) : (
              <></>
            )}
            </div>
          )}
          {(data.articlesIndex.showMicroservices) && (
            <div className="max-w-sm shrink pl-16">
                <MicroservicesPanel
                  title={data.articlesIndex.microservicesTitle}
                  description={data.articlesIndex.microservicesDescription}
                  url={data.articlesIndex.microservicesUrl}
                />
            </div>
          )}
        </section>
        <Section>
          <BuiltOnAzure data={{ backgroundColor: "default" }} />
        </Section>
      </Layout>
    </div>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.articlesIndexContentQuery({
    relativePath: "index.mdx",
  });

  const seo = tinaProps.data.articlesIndex.seo;
  if (seo && (seo?.canonical === null || seo?.canonical === "")) {
    seo.canonical = `${tinaProps.data.global.header.url}articles`;
  }

  return {
    props: {
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
      seo,
    },
  };
};
