import client from "../../.tina/__generated__/client";
import { Layout } from "../../components/layout";
import { InferGetStaticPropsType } from "next";

import { SEO } from "../../components/util/seo";
import { useTina } from "tinacms/dist/react";
import { Section } from "../../components/util/section";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { removeExtension } from "services/client/utils.service";
import { Blocks } from "../../components/blocks-renderer";
import { CustomLink } from "../../components/customLink";
import { Container } from "../../components/util/container";

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
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          suffix={data.global.breadcrumbSuffix}
          title={data.logos.seo?.title}
          seoSchema={data.logos.seo}
        />
        <h1 className="pt-0 text-3xl">{data.logos?.header}</h1>
        <Blocks prefix="Logos_body" blocks={data.logos._body} />
        {data.logos?.footer?.text && (
          <Section className="justify-center">
            <CustomLink href={data.logos.footer.link}>
              {data.logos.footer.text}
            </CustomLink>
          </Section>
        )}
      </Container>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const tinaProps = await client.queries.logosContentQuery({
    relativePath: `${params.filename}.mdx`,
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
  return {
    paths: pagesListData.data.logosConnection.edges.map((page) => ({
      params: { filename: page.node._sys.filename },
    })),
    fallback: false,
  };
};
