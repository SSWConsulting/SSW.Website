import { InferGetStaticPropsType } from "next";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../../../.tina/__generated__/client";
import { BuiltOnAzure } from "../../../../components/blocks";
import { Blocks } from "../../../../components/blocks-renderer";
import { Breadcrumbs } from "../../../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../../../components/layout";
import { Section } from "../../../../components/util/section";
import { SEO } from "../../../../components/util/seo";
import { RecaptchaContext } from "../../../../context/RecaptchaContext";
import { removeExtension } from "../../../../services/client/utils.service";

export default function CompanyPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <RecaptchaContext.Provider
      value={{ recaptchaKey: props.env.GOOGLE_RECAPTCHA_SITE_KEY }}
    >
      <div>
        <SEO seo={props.seo} />
        <Layout>
          {data.caseStudy.seo?.showBreadcrumb === null ||
            (data.caseStudy.seo?.showBreadcrumb && (
              <Section className="mx-auto w-full max-w-9xl px-8 py-0">
                <Breadcrumbs
                  path={removeExtension(props.variables.relativePath)}
                  suffix={data.global.breadcrumbSuffix}
                  title={data.caseStudy.seo?.title}
                  seoSchema={data.caseStudy.seo}
                />
              </Section>
            ))}
          <Section className="mx-auto w-full max-w-9xl px-8 ">
            <div>
              <h1
                data-tina-field={tinaField(data.caseStudy, "heading")}
                className="p-0"
              >
                {data.caseStudy.heading}
              </h1>
              <h2
                data-tina-field={tinaField(data.caseStudy, "subHeading")}
                className="p-0 text-sm"
              >
                {data.caseStudy.subHeading}
              </h2>
            </div>
          </Section>
          <Blocks prefix="CaseStudy_body" blocks={data.caseStudy._body} />
          <Section className="prose mx-auto !block w-full max-w-9xl px-8 py-0">
            <TinaMarkdown
              data-tina-field={tinaField(data.caseStudy, "content")}
              components={componentRenderer}
              content={data.caseStudy.content}
            />
          </Section>
          <Section>
            <BuiltOnAzure data={{ backgroundColor: "lightgray" }} />
          </Section>
        </Layout>
      </div>
    </RecaptchaContext.Provider>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.caseStudyContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const seo = tinaProps.data.caseStudy.seo;
  if (seo && (seo?.canonical === null || seo?.canonical === "")) {
    seo.canonical = `${tinaProps.data.global.header.url}company/client/${params.filename}`;
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
  let pageListData = await client.queries.caseStudyConnection();
  const allPagesListData = pageListData;

  while (pageListData.data.caseStudyConnection.pageInfo.hasNextPage) {
    const lastCursor = pageListData.data.caseStudyConnection.pageInfo.endCursor;
    pageListData = await client.queries.caseStudyConnection({
      after: lastCursor,
    });

    allPagesListData.data.caseStudyConnection.edges.push(
      ...pageListData.data.caseStudyConnection.edges
    );
  }

  return {
    paths: allPagesListData.data.caseStudyConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
