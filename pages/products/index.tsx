import { client } from "@/tina/client";
import { useTina } from "tinacms/dist/react";

import { InferGetStaticPropsType } from "next";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { PageCard } from "../../components/blocks/pageCards";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

export default function ProductsIndex(
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
        <Breadcrumbs path={"/products"} suffix="" title={"Products"} />
        {data.productsIndex.title && (
          <h1 className="mb-0 py-0 text-3xl">{data.productsIndex.title}</h1>
        )}
        {data.productsIndex.subTitle && (
          <h2 className="mb-4 text-base">{data.productsIndex.subTitle}</h2>
        )}
        <div className="flex flex-col md:flex-row">
          <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
            {data.productsIndex.productsList?.map((product, index) => (
              <PageCard page={product} key={index} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const tinaProps = await client.queries.productsIndexQuery();

  const seo = tinaProps.data.productsIndex.seo;
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
