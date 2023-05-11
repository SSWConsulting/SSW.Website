import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { client } from "../../.tina/__generated__/client";
import { useTina } from "tinacms/dist/react";

import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { Breadcrumbs } from "../../components/blocks/breadcrumbs";
import { SEO } from "../../components/util/seo";
import { InferGetStaticPropsType } from "next";

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
  const [seo, setSeo] = useState(null);

  useEffect(() => {
    // extract the data we need from the tina result
    const processedData = processData(data);
    setProductsList(processedData.productsList);
    setSeo(processedData.seo);
  }, [data]);

  return (
    <Layout>
      <SEO seo={seo} />
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/products"} suffix="" title={"Products"} />
        <h1 className="mb-0 py-0 text-3xl">SSW Products</h1>
        <h2 className="mb-4 text-md">
          Used by thousands of customers around the world
        </h2>
        <div className="flex flex-col md:flex-row">
          <div>
            <div
              ref={gridRef}
              className="grid grid-cols-1 gap-2 lg:grid-cols-2"
            >
              {productsList.map((product) => (
                <PageCard
                  page={product}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

const PageCard = ({ page }) => {
  return (
    <div
      className="relative bg-white p-3 hover:bg-gray-50"
    >
      <div className="flex">
        <div className="shrink-0">
          {page.logo && (
            <Image
              className="mr-4 aspect-square h-14 w-14 border-1 border-gray-100 md:h-28 md:w-28"
              height={115}
              width={115}
              src={page.logo}
              alt={`${page.title} logo`}
            />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <Link href={page.url} className="unstyled" target="_blank">
            <span className="absolute inset-0" aria-hidden="true" />
            <h3 className="mb-2 mt-0 text-lg text-sswRed">{page.name}</h3>
            <p className="text-sm text-black">{page.description}</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

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


  return {
    props: {
      ...tinaProps,
    },
  };
};
