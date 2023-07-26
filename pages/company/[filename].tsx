import { InferGetStaticPropsType } from "next";
import client from "../../.tina/__generated__/client";
import { SEO } from "../../components/util/seo";
import { Layout } from "../../components/layout";
import { Section } from "../../components/util/section";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { removeExtension } from "../../services/client/utils.service";
import { tinaField, useTina } from "tinacms/dist/react";
import { BuiltOnAzure } from "../../components/blocks";
import HistoryTimeline from "../../components/company/historyTimeline";
import { HistoryTimelineCardProps } from "../../components/company/historyTimelineCard";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";

export default function CompanyPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const historyCardProps =
    data.company?.historyCards?.map<HistoryTimelineCardProps>((m) => ({
      year: m.year,
      title: m.title,
      location: m.location as HistoryTimelineCardProps["location"],
      description: m.description,
    })) || [];

  return (
    <div>
      <SEO seo={props.seo} />
      <Layout>
        {data.company.seo?.showBreadcrumb === null ||
        data.company.seo?.showBreadcrumb ? (
          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              suffix={data.global.breadcrumbSuffix}
              title={data.company.seo?.title}
              seoSchema={data.company.seo}
            />
          </Section>
        ) : (
          <></>
        )}
        {data.company._body.children.length > 0 && (
          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <div data-tina-field={tinaField(data.company, "_body")}>
              <TinaMarkdown
                components={componentRenderer}
                content={data.company._body}
              />
            </div>
          </Section>
        )}
        {data.company.historyCards?.length > 0 ? (
          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <HistoryTimeline cardProps={historyCardProps} />
          </Section>
        ) : (
          <></>
        )}
        <Section>
          <BuiltOnAzure data={{ backgroundColor: "default" }} />
        </Section>
      </Layout>
    </div>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.companyContentQuery({
    relativePath: `${params.filename}.mdx`,
  });

  const canonical = `${tinaProps.data.global.header.url}company/${params.filename}`;
  const seo = tinaProps.data.company.seo;
  if (seo) {
    seo.canonical = canonical;
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
