import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { Container } from "@/components/util/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function ServerPage({ data }) {
  return (
    <>
      {/* <Section className="mx-auto w-full max-w-9xl px-8 pt-5">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          suffix={data.global.breadcrumbSuffix}
          title={data.products.seo?.title}
        />
      </Section> */}
      <Container
        className={
          "prose flex-1 pt-4 prose-h1:!my-0 prose-h1:!pt-4 prose-h3:!mt-0 prose-img:!my-0"
        }
      >
        <TinaMarkdown
          content={data.products._body}
          components={componentRenderer}
        />
      </Container>
    </>
  );
}
