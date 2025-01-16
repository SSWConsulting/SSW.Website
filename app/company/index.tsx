"use client";

import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import CompanyHeader from "@/components/company/companyHeader";
import CompanyPages from "@/components/company/companyPages";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function CompanyIndexPage({ props, tinaProps }) {
  const { data } = tinaProps;
  const { companyPageProps } = props;

  return (
    <>
      {data.companyIndex.headerImage?.heroBackground && (
        <Section className="mx-auto hidden w-full sm:block">
          <CompanyHeader
            data={data.companyIndex.headerImage}
            schema={data.companyIndex.headerImage}
          />
        </Section>
      )}
      {data.companyIndex.seo?.showBreadcrumb === null ||
        (data.companyIndex.seo?.showBreadcrumb && (
          <Section className="mx-auto w-full max-w-9xl px-8 py-5">
            <Breadcrumbs
              path={removeExtension(props.variables.relativePath)}
              title={data.companyIndex.seo?.title}
              seoSchema={data.companyIndex.seo}
            />
          </Section>
        ))}
      <Section className="mx-auto w-full max-w-9xl px-8 pb-4 pt-2">
        <h1
          className="mt-0 py-2"
          data-tina-field={tinaField(data.companyIndex, "title")}
        >
          {data.companyIndex.title}
        </h1>
      </Section>
      {data.companyIndex._body.children.length > 0 && (
        <Section className="mx-auto w-full max-w-9xl px-8 py-5">
          <div data-tina-field={tinaField(data.companyIndex, "_body")}>
            <TinaMarkdown
              components={componentRenderer}
              content={data.companyIndex._body}
            />
          </div>
        </Section>
      )}
      {data.companyIndex.companyPages?.length > 0 ? (
        <Section className="mx-auto !bg-gray-100 px-8">
          <CompanyPages
            cardProps={companyPageProps}
            schema={data.companyIndex.companyPages}
          />
        </Section>
      ) : (
        <></>
      )}
      <Section>
        <BuiltOnAzure data={data.companyIndex.azureBanner} />
      </Section>
    </>
  );
}
