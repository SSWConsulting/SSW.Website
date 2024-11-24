"use client";

import { Blocks } from "@/components/blocks-renderer";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { useTina } from "tinacms/dist/react";

type ConsultingV2Props = {
  tinaProps: any;
  props: any;
};

export default function ConsultingV2({ tinaProps, props }: ConsultingV2Props) {
  const { data } = tinaProps;
  return (
    <>
      <Section className="mb-16">
        <Container padding="px-4" className="flex w-full flex-wrap">
          {data.consultingv2.blocks ? (
            <div>
              <Blocks
                prefix={"Consultingv2Blocks"}
                blocks={data.consultingv2.blocks}
              />
            </div>
          ) : (
            <></>
          )}
        </Container>
      </Section>
      <PreFooter />
    </>
  );
}
