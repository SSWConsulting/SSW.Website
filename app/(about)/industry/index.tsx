"use client";

import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { PageCard } from "@/components/blocks/pageCards";
import { Container } from "@/components/util/container";
import { Breadcrumbs } from "../../components/breadcrumb";

export default function IndustriesPage({ tinaProps }) {
  const { data } = tinaProps;
  return (
    <>
      <Container className="mb-10 flex-1 pt-2">
        <Breadcrumbs path={"/industry"} title={"Industry"} />
        {data.industryIndex.title && (
          <h1 className="mb-0 py-0 text-3xl">{data.industryIndex.title}</h1>
        )}
        {data.industryIndex.subTitle && (
          <h2 className="mb-4 text-base">{data.industryIndex.subTitle}</h2>
        )}
        <div className="flex flex-col md:flex-row">
          <div className="grid w-full grid-cols-1 gap-2 lg:grid-cols-2">
            {data.industryIndex.industryList?.map((product, index) => (
              <PageCard page={product} key={index} />
            ))}
          </div>
        </div>
      </Container>
      <BuiltOnAzure data={data.industryIndex.azureBanner} />
    </>
  );
}
