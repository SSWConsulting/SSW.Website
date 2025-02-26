"use client";

import { Breadcrumbs } from "@/app/components/breadcrumb";
import { Blocks } from "@/components/blocks-renderer";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { componentRenderer } from "@/components/blocks/mdxComponentRenderer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function LogoPage({ props, tinaProps }) {
  const { data } = tinaProps;

  return (
    <>
      <Container className="flex-1 pt-2">
        {props?.seo?.showBreadcrumb && (
          <Breadcrumbs
            path={removeExtension(props.variables.relativePath)}
            title={data.logos?.seo?.title}
          />
        )}
        <h1
          data-tina-field={tinaField(data?.logos, "header")}
          className="pt-0 text-3xl"
        >
          {data?.logos?.header}
        </h1>
        {data.logos?.subHeader && (
          <span data-tina-field={tinaField(data?.logos, "subHeader")}>
            <TinaMarkdown content={data.logos?.subHeader} />
          </span>
        )}
        <Blocks prefix="Logos_body" blocks={data.logos?._body} />
        {data.logos?.footer && (
          <Section className="w-full flex-col gap-6 text-center">
            <TinaMarkdown
              data-tina-field={tinaField(data.logos, "footer")}
              content={data.logos.footer}
              components={componentRenderer}
            />
          </Section>
        )}
      </Container>
      <BuiltOnAzure data={data.logos.azureBanner} />
    </>
  );
}
