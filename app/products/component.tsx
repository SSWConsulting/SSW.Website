import Breadcrumbs from "nextjs-breadcrumbs2";
import { Layout } from "../../components/layout";
import { Container } from "../../components/util/container";
import { SEO } from "../../components/util/seo";

export const ProductsPage = ({ data }) => {
  return (
    <Layout menu={data.megamenu}>
      <SEO seo={props.seo} />
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/products"} suffix="" title={"Products"} />
        <h1 className="mb-0 py-0 text-3xl">SSW Products</h1>
        <h2 className="mb-4 text-base">
          Used by thousands of customers around the world
        </h2>
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
};
