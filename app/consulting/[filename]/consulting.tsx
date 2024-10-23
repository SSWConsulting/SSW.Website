"use client";

import { Section } from "@/components/util/section";
import { removeExtension } from "@/services/client/utils.service";
import { Breadcrumbs } from "app/components/breadcrumb";

export default function Consulting({ props, tinaProps }) {
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
    </>
  );
}
