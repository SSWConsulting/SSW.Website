import { InferGetStaticPropsType } from "next";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import client from "../../.tina/__generated__/client";
import { BuiltOnAzure } from "../../components/blocks";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import CompanyHeader from "../../components/company/companyHeader";
import { CompanyIndexProps } from "../../components/company/companyPageCard";
import CompanyPages from "../../components/company/companyPages";
import { Layout } from "../../components/layout";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";
import { removeExtension } from "../../services/client/utils.service";

export default function CompanyIndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  const companyPageProps =
    data.companyIndex?.companyPages?.map<CompanyIndexProps>((m) => ({
      title: m.title,
      body: m.body,
      pageURL: m.pageURL,
      isExternal: m.isExternal,
    })) || [];

  return (
    <div>
      <SEO seo={props.seo} />
      <Layout menu={data.megamenu}>
        {data.companyIndex.headerImage?.heroBackground && (
          <Section className="mx-auto  hidden w-full sm:block ">
            <CompanyHeader
              data={data.companyIndex.headerImage}
              schema={data.companyIndex.headerImage}
            />
          </Section>
        )}
        {data.companyIndex.seo?.showBreadcrumb === null ||
          (data.companyIndex.seo?.showBreadcrumb && (
            <Section className="mx-auto w-full max-w-9xl px-8 py-5">
              <Breadcrumbs
                path={removeExtension(props.variables.relativePath)}
                suffix={data.global.breadcrumbSuffix}
                title={data.companyIndex.seo?.title}
                seoSchema={data.companyIndex.seo}
              />
            </Section>
          ))}
        <Section className="mx-auto w-full max-w-9xl px-8 pb-4 pt-2">
          <h1
            className="mt-0 py-2"
            data-tina-field={tinaField(data.companyIndex, "title")}
          >
            {data.companyIndex.title}
          </h1>
        </Section>
        {data.companyIndex._body.children.length > 0 && (
          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <div data-tina-field={tinaField(data.companyIndex, "_body")}>
              <TinaMarkdown
                components={componentRenderer}
                content={data.companyIndex._body}
              />
            </div>
          </Section>
        )}
        {data.companyIndex.companyPages?.length > 0 ? (
          <Section className="mx-auto !bg-gray-100 px-8">
            <CompanyPages
              cardProps={companyPageProps}
              schema={data.companyIndex.companyPages}
            />
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

export const getStaticProps = async () => {
  const tinaProps = await client.queries.companyIndexContentQuery({
    relativePath: "index.mdx",
  });

  const seo = tinaProps.data.companyIndex.seo;
  if (seo && (seo?.canonical === null || seo?.canonical === "")) {
    seo.canonical = `${tinaProps.data.global.header.url}company/`;
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
