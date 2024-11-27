"use client";

import { Blocks } from "@/components/blocks-renderer";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { SectionColor } from "@/components/util/constants/styles";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { Consultingv2Query } from "@/tina/types";

type ConsultingV2PageProps<T> = {
  tinaProps: {
    data: Consultingv2Query;
  };
  props: T;
};

export default function ConsultingV2({
  tinaProps,
}: ConsultingV2PageProps<object>) {
  const { data } = tinaProps;

  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname*/}
      <div className="dark flex h-full flex-col">
        <Section color={SectionColor.ToggleLightMode}>
          <Container width="custom" size="small" className="w-full sm:py-12">
            <div className="w-full">
              {data.consultingv2.blocks ? (
                <Blocks
                  prefix={"Consultingv2Blocks"}
                  blocks={data.consultingv2.blocks}
                />
              ) : (
                <></>
              )}
            </div>
          </Container>
        </Section>
        <PreFooter />
      </div>
    </>
  );
}
