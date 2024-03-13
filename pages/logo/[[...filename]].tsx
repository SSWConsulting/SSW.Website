import { InferGetStaticPropsType } from "next";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { removeExtension } from "services/client/utils.service";
import { tinaField, useTina } from "tinacms/dist/react";
import client from "../../.tina/__generated__/client";
import { Blocks } from "../../components/blocks-renderer";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { componentRenderer } from "../../components/blocks/mdxComponentRenderer";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Section } from "../../components/util/section";
import { SEO } from "../../components/util/seo";

export default function LogosPage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    data: props.data,
    query: props.query,
    variables: props.variables,
  });

  return (
    <Layout menu={data?.megamenu}>
      <SEO seo={props.seo} />
      <Container className="flex-1 pt-2">
        {data?.logos.seo.showBreadcrumb && (
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            suffix={data.global.breadcrumbSuffix}
            title={data.logos.seo?.title}
            seoSchema={data.logos.seo}
          />
        )}
        <h1 className="pt-0 text-3xl">{data.logos?.header}</h1>
        <Blocks prefix="Logos_body" blocks={data.logos._body} />
        {data.logos.showBorderBottom && <hr className="pb-6" />}
        {data.logos?.footer && (
          <Section className="justify-center">
            <div data-tina-field={tinaField(data.logos, "footer")}>
              <TinaMarkdown
                content={data.logos.footer}
                components={componentRenderer}
              />
            </div>
          </Section>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  let filename = params.filename;
  if (!filename) {
    filename = "index";
  } else {
    filename = filename.join("/");
  }
  const tinaProps = await client.queries.logosContentQuery({
    relativePath: `${filename}.mdx`,
  });

  const seo = tinaProps.data.logos.seo;
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
  const pagesListData = await client.queries.logosConnection();
  const paths = pagesListData.data.logosConnection.edges.map((page) => {
    if (page.node._sys.filename === "index") {
      return {
        params: { filename: [] },
      };
    }

    return {
      params: { filename: page.node._sys.breadcrumbs },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};
