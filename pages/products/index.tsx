import { useEffect, useRef, useState } from "react";

import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";

import { InferGetStaticPropsType } from "next";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { PageCard } from "../../components/blocks/pageCards";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

export default function ProductsIndex(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const gridRef = useRef(null);
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const [productsList, setProductsList] = useState([]);

  useEffect(() => {
    // extract the data we need from the tina result
    const processedData = processData(data);
    setProductsList(processedData.productsList);
  }, [data]);

  return (
    <Layout>
      <SEO seo={props.seo} />
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/products"} suffix="" title={"Products"} />
        <h1 className="mb-0 py-0 text-3xl">SSW Products</h1>
        <h2 className="mb-4 text-base">
          Used by thousands of customers around the world
        </h2>
        <div className="flex flex-col md:flex-row">
          <div
            ref={gridRef}
            className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2"
          >
            {productsList.map((product, index) => (
              <PageCard page={product} key={index} />
            ))}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const processData = (data) => {
  if (data.productsIndexConnection.edges.length !== 1) {
    throw new Error("Expected exactly one consulting index page");
  }

  const node = data.productsIndexConnection.edges[0].node;

  return {
    productsList: node.productsList,
    seo: node.seo,
  };
};

export const getStaticProps = async () => {
  const tinaProps = await client.queries.productsIndexConnection();

  const globalData = await client.queries.global({
    relativePath: "index.json",
  });

  const seo = tinaProps.data.productsIndexConnection.edges[0].node.seo;
  if (seo && !seo.canonical) {
    seo.canonical = `${globalData.data.global.header.url}/products`;
  }

  return {
    props: {
      ...tinaProps,
      seo,
    },
  };
};
