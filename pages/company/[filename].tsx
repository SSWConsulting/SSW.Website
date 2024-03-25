import { InferGetStaticPropsType } from "next";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { Blocks } from "../../components/blocks-renderer";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { BuiltOnAzure } from "../../components/blocks/builtOnAzure";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { TechUpgrade } from "../../components/blocks/techUpgrade";
import HistoryTimeline from "../../components/company/historyTimeline";
import { HistoryTimelineCardProps } from "../../components/company/historyTimelineCard";
import { RDPanel } from "../../components/company/rdPanel";
import { Layout } from "../../components/layout";
import TestimonialPanel from "../../components/offices/testimonialPanel";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { RecaptchaContext } from "../../context/RecaptchaContext";
import { removeExtension } from "../../services/client/utils.service";

export default function CompanyPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const historyCardProps =
    data?.company?.historyCards?.map<HistoryTimelineCardProps>((m) => ({
      year: m.year,
      title: m.title,
      location: m.location as HistoryTimelineCardProps["location"],
      description: m.description,
    })) || [];

  return (
    <RecaptchaContext.Provider
      value={{ recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY }}
    >
      <div>
        <SEO seo={props.seo} />
        <Layout menu={data.megamenu}>
          <Blocks prefix="CompanyBeforeBody" blocks={data.company.beforeBody} />
          {data.company.seo?.showBreadcrumb === null ||
            (data.company.seo?.showBreadcrumb && (
              <Section className="mx-auto w-full max-w-9xl px-8 py-5">
                <Breadcrumbs
                  path={removeExtension(props.variables.relativePath)}
                  suffix={data.global.breadcrumbSuffix}
                  title={data.company.seo?.title}
                  seoSchema={data.company.seo}
                />
              </Section>
            ))}
          {data.company.title && (
            <Section
              className="mx-auto w-full max-w-9xl px-8"
              data-tina-field={tinaField(data.company, "title")}
            >
              <h1 className="mt-4 py-2">{data.company.title}</h1>
            </Section>
          )}
          {data.company.subTitle && (
            <section className="prose mx-auto w-full max-w-9xl flex-row px-8 prose-h1:my-0 prose-h1:pt-8 prose-h2:mt-8 prose-img:my-0 md:flex">
              <div>
                <TinaMarkdown
                  content={data.company.subTitle}
                  data-tina-field={tinaField(data.company, "subTitle")}
                  components={componentRenderer}
                />
              </div>
              {(data.company.sidebar ||
                data.company.sidebarTestimonial ||
                data.company.showRdPanel) && (
                <div className="min-w-fit max-w-sm shrink pl-16">
                  {data.company.sidebar && (
                    <TinaMarkdown
                      content={data.company.sidebar}
                      components={componentRenderer}
                    />
                  )}
                  {data.company.sidebarTestimonial && (
                    <TestimonialPanel
                      testimonialName={data.company.sidebarTestimonial}
                    />
                  )}
                  {data.company.showRdPanel && <RDPanel />}
                </div>
              )}
            </section>
          )}

          <Blocks prefix="Company_body" blocks={data.company._body} />
          {data.company.historyCards?.length > 0 && (
            <Section className="mx-auto w-full max-w-9xl px-8 py-5">
              <HistoryTimeline cardProps={historyCardProps} />
            </Section>
          )}
          {data.company.showTechUpgradeBlock && (
            <Section className="mx-auto w-full  !bg-gray-75 px-8 py-5">
              <TechUpgrade />
            </Section>
          )}
          <Section>
            <BuiltOnAzure data={{ backgroundColor: "default" }} />
          </Section>
        </Layout>
      </div>
    </RecaptchaContext.Provider>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.companyContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const seo = tinaProps.data.company.seo;
  if (seo && (seo?.canonical === null || seo?.canonical === "")) {
    seo.canonical = `${tinaProps.data.global.header.url}company/${params.filename}`;
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
  let pageListData = await client.queries.companyConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.companyConnection.pageInfo.hasNextPage) {
    const lastCursor = pageListData.data.companyConnection.pageInfo.endCursor;
    pageListData = await client.queries.companyConnection({
      after: lastCursor,
    });

    allPagesListData.data.companyConnection.edges.push(
      ...pageListData.data.companyConnection.edges
    );
  }

  return {
    paths: allPagesListData.data.companyConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
