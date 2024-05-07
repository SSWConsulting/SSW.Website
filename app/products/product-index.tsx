import { PageCard } from "@/components/blocks/pageCards";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";

export default function ProductIndex({ data }) {
  return (
    <>
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/products"} suffix="" title={"Products"} />
        {data.productsIndex.title && (
          <h1
            data-tina-field={tinaField(data.productsIndex, "title")}
            className="mb-0 py-0 text-3xl"
          >
            {data.productsIndex.title}
          </h1>
        )}
        {data.productsIndex.subTitle && (
          <h2
            data-tina-field={tinaField(data.productsIndex, "subTitle")}
            className="mb-4 text-base"
          >
            {data.productsIndex.subTitle}
          </h2>
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
