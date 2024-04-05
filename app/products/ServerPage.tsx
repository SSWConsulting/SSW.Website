import { PageCard } from "@/components/blocks/pageCards";
import { Container } from "@/components/util/container";

export default function ServerPage(props) {
  const data = props.props.data;

  return (
    <>
      {/* <SEO seo={props.seo} /> */}
      <Container className="mb-10 flex-1 pt-2">
        {/* <Breadcrumbs path={"/products"} suffix="" title={"Products"} /> */}
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
    </>
  );
}
