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
      <Section
        className="dark flex h-full flex-grow flex-col"
        color={SectionColor.ToggleLightMode}
      >
        <Container
          className="size-full w-full flex-grow flex-wrap sm:py-12"
          size="small"
        >
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
        <PreFooter />
      </Section>
    </>
  );
}
