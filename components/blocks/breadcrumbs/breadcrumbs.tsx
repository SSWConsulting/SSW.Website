"use client";

import { backgroundOptions } from "@/components/blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import { Container } from "@/components/util/container";
import global from "@/content/global/index.json";
import { Consultingv2BlocksBreadcrumbs } from "@/tina/types";
import React from "react";
import { Breadcrumbs, ComponentWrapper } from "ssw-tinacms-landingkit";

export function BreadcrumbsComponent({
  data,
}: {
  data: Consultingv2BlocksBreadcrumbs;
}) {
  const { finalBreadcrumb } = data;
  const breadcrumbData = {
    breadcrumbReplacements: global.breadcrumbReplacements,
    firstBreadcrumb: global.breadcrumbHomeRoute,
    finalBreadcrumb: finalBreadcrumb,
    finalNodePlaceholder: "Lorem Ipsum",
  };

  return (
    <ComponentWrapper data={data} backgroundOptions={backgroundOptions}>
      <Container size="custom" padding="px-4 sm:px-8" className="pt-8 sm:pt-12">
        <Breadcrumbs
          data={breadcrumbData}
          className="text-gray-300"
          separatorColor="dark:stroke-gray-300"
          separatorSize="h-4 w-4"
        ></Breadcrumbs>
      </Container>
    </ComponentWrapper>
  );
}
