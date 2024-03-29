import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";

import { InferGetStaticPropsType } from "next";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { PageCard } from "../../components/blocks/pageCards";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

export default function PartnersIndex(
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
        <Breadcrumbs path={"/Partners"} suffix="" title={"Partners"} />
        <h1 className="mb-0 py-0 text-3xl">{data.partnerIndex.title}</h1>
        <h2 className="mb-4 text-base">{data.partnerIndex.subTitle}</h2>
        <div className="flex flex-col md:flex-row">
          <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
            {data.partnerIndex.partnersList?.map((partner, index) => (
              <PageCard page={partner} key={index} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.partnerIndexQuery();

  const seo = tinaProps.data.partnerIndex.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${tinaProps.data.global.header.url}company/partners`;
  }

  return {
    props: {
      ...tinaProps,
      seo,
    },
  };
};
