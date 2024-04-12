import { InferGetStaticPropsType } from "next";
import { relative } from "path";
import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { PageCard } from "../../components/blocks/pageCards";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

export default function IndustryIndex(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout menu={data.megamenu}>
      <SEO seo={props.seo} />
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/industry"} suffix="" title={"Industry"} />
        {data.industryIndex.title && (
          <h1 className="mb-0 py-0 text-3xl">{data.industryIndex.title}</h1>
        )}
        {data.industryIndex.subTitle && (
          <h2 className="mb-4 text-base">{data.industryIndex.subTitle}</h2>
        )}
        <div className="flex flex-col md:flex-row">
          <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
            {data.industryIndex.industryList?.map((product, index) => (
              <PageCard page={product} key={index} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.industryIndexQuery();

  const seo = tinaProps.data.industryIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}/products`;
  }

  return {
    props: {
      ...tinaProps,
      seo,
    },
  };
};
