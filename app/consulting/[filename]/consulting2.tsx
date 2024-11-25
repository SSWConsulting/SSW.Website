"use client";

import { Blocks } from "@/components/blocks-renderer";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { SectionColor } from "@/components/util/constants/styles";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { Consultingv2Query } from "@/tina/types";

type ConsultingV2PageProps = {
  tinaProps: {
    data: Consultingv2Query;
  };
  props: any;
};

export default function ConsultingV2({ tinaProps }: ConsultingV2PageProps) {
  const { data } = tinaProps;
  return (
    <>
      <div className="flex h-full flex-col">
        <Section color={SectionColor.DarkGray} className="">
          <Container padding="px-4" className="w-full flex-wrap">
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
      </div>
    </>
  );
}
