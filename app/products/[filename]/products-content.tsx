import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import { TinaMarkdown } from "tinacms/dist/rich-text";
export default function ProductsContent({ props }) {
  const { data, variables } = props;
  return (
    <>
      <Section className="mx-auto w-full max-w-9xl px-8 pt-5">
        <Breadcrumbs
          path={removeExtension(variables.relativePath)}
          title={data.products?.seo?.title}
        />
      </Section>
      <Container
        className={
          "prose flex-1 pt-4 prose-h1:!my-0 prose-h1:!pt-4 prose-h3:!mt-0 prose-img:!my-0"
        }
      >
        <TinaMarkdown
          content={data.products?._body}
          components={componentRenderer}
        />
      </Container>
      <BuiltOnAzure data={data.products} />
    </>
  );
}
