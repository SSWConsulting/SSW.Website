"use client";
import { useBranch } from "@/app/providers/branch-provider";
import { Blocks } from "@/components/blocks-renderer";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { Consultingv2Query } from "@/tina/types";
import _ from "lodash";
import React, { memo } from "react";

type ConsultingV2PageProps<T> = {
  tinaProps: {
    data: Consultingv2Query;
    query: string;
    variables: object;
  };
  props: T;
};

const Consulting2 = memo(
  function ConsultingV2({ tinaProps }: ConsultingV2PageProps<object>) {
    const { data } = tinaProps;

    const b = useBranch();
    console.log("Current Branch in Consulting V2:", b);

    return (
      <>
        <div className="dark flex h-full flex-col">
          <Section color={"toggleLightMode"}>
            <Container
              size="custom"
              width="custom"
              padding="custom"
              className="w-full p-0"
            >
              <div className="relative z-0 w-full">
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
          <PreFooter data={data.consultingv2.azureBanner} />
        </div>
      </>
    );
  },
  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
);

export default Consulting2;
