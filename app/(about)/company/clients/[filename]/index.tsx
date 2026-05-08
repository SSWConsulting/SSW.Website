"use client";

import { Blocks } from "@/components/blocks-renderer";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { TechUpgrade } from "@/components/blocks/techUpgrade";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function CompanyPage({ tinaProps, props }) {
  const { data } = tinaProps;

  return (
    <>
      {data.caseStudy.seo?.showBreadcrumb === null ||
        (data.caseStudy.seo?.showBreadcrumb && (
          <Section className="mx-auto min-h-24 w-full max-w-9xl px-4 py-5 sm:px-8 md:min-h-16">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              title={data.caseStudy.seo?.title}
              seoSchema={data.caseStudy.seo}
            />
          </Section>
        ))}
      <Section className="mx-auto w-full max-w-9xl px-4 sm:px-8">
        <div>
          <h1
            data-tina-field={tinaField(data.caseStudy, "heading")}
            className="p-0"
          >
            {data.caseStudy.heading}
          </h1>
          <h2
            data-tina-field={tinaField(data.caseStudy, "subHeading")}
            className="p-0 text-sm"
          >
            {data.caseStudy.subHeading}
          </h2>
        </div>
      </Section>
      <Blocks prefix="CaseStudy_body" blocks={data.caseStudy._body} />
      <Section className="prose mx-auto !block w-full max-w-9xl px-4 pb-16 pt-0 sm:px-8">
        <TinaMarkdown
          data-tina-field={tinaField(data.caseStudy, "content")}
          components={componentRenderer}
          content={data.caseStudy.content}
        />
      </Section>
      <Section className="mx-auto w-full !bg-gray-75 px-4 py-5 sm:px-8">
        <TechUpgrade />
      </Section>
    </>
  );
}
