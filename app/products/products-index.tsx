import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { PageCard } from "@/components/blocks/pageCards";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";

export default function ProductsIndexContent({ props }) {
  return (
    <>
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/products"} title={"Products"} />
        {props.productsIndex.title && (
          <h1
            props-tina-field={tinaField(props.productsIndex, "title")}
            className="mb-0 py-0 text-3xl"
          >
            {props.productsIndex.title}
          </h1>
        )}
        {props.productsIndex.subTitle && (
          <h2
            props-tina-field={tinaField(props.productsIndex, "subTitle")}
            className="mb-4 text-base"
          >
            {props.productsIndex.subTitle}
          </h2>
        )}
        <div className="flex flex-col md:flex-row">
          <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
            {props.productsIndex.productsList?.map((product, index) => (
              <PageCard page={product} key={index} />
            ))}
          </div>
        </div>
      </Container>
      <BuiltOnAzure data={props.productsIndex.azureBanner} />
    </>
  );
}
