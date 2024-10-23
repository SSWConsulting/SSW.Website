"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { Marketing } from "@/components/marketing/Marketing";
import { TestimonialRow } from "@/components/testimonials/TestimonialRow";
import { Benefits } from "@/components/util/consulting/benefits";
import { Container } from "@/components/util/container";

import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Consulting({ props, tinaProps }) {
  const { categories, marketingData, mediaCardProps, techCards } = props;
  const { data } = tinaProps;
  return (
    <>
      <Section className="mx-auto min-h-24 w-full max-w-9xl px-8 py-5 md:min-h-16">
        <Breadcrumbs
          path={removeExtension(props.variables.relativePath)}
          suffix={data.global.breadcrumbSuffix}
          title={data.consulting.seo?.title}
          seoSchema={data.consulting.seo}
        />
      </Section>
      <Section
        color="black"
        className={"prose-dark border-y-4 border-y-sswRed text-center"}
      >
        <a id="more" />
        <div className="w-full bg-benefits bg-cover bg-fixed bg-center bg-no-repeat py-12">
          <div
            data-tina-field={tinaField(data.consulting, "_body")}
            className="mx-auto max-w-9xl px-4"
          >
            <TinaMarkdown
              components={componentRenderer}
              content={data.consulting._body}
            />
            <Benefits data={data.consulting.benefits} />
          </div>
        </div>
      </Section>
      <Section className="mb-16">
        <Container padding="px-4" className="flex w-full flex-wrap">
          {data.consulting.afterBody ? (
            <div>
              <Blocks
                prefix={"ConsultingAfterBody"}
                blocks={data.consulting.afterBody}
              />
            </div>
          ) : (
            <></>
          )}
          <TestimonialRow
            testimonialsResult={props.testimonialsResult}
            categories={categories}
            tagline={data.consulting.testimonials?.tagline}
          />
        </Container>
      </Section>
      <Marketing content={marketingData} />
      <Section className="!bg-gray-75 pb-40">
        <Container size="custom">
          <h1 className="text-center">Companies we have worked with</h1>
        </Container>
      </Section>
      {!!techCards.length && <></>}
      {!!mediaCardProps.length && <></>}
    </>
  );
}
