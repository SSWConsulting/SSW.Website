"use client";

import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { PageCard } from "@/components/blocks/pageCards";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "app/components/breadcrumb";

export default function PartnersIndex({ tinaProps }) {
  const { data } = tinaProps;

  return (
    <>
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/Partners"} title={"Partners"} />
        <h1 className="mb-0 py-0 text-3xl">{data.partnerIndex.title}</h1>
        <h2 className="mb-4 text-base">{data.partnerIndex.subTitle}</h2>
        <div className="flex flex-col md:flex-row">
          <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
            {data.partnerIndex.partnersList?.map((partner, index) => (
              <PageCard page={partner} key={index} />
            ))}
          </div>
        </div>
      </Container>
      <BuiltOnAzure data={data.partnerIndex.azureBanner} />
    </>
  );
}
