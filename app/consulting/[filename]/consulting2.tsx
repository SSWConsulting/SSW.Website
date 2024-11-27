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
      <div className="dark flex h-full flex-col">
        <Section
          className="flex h-full flex-col"
          color={SectionColor.ToggleLightMode}
        >
          <Container className="h-full w-full flex-wrap sm:py-12" size="medium">
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
