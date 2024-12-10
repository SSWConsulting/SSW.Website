"use client";
import { Blocks } from "@/components/blocks-renderer";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { SectionColor } from "@/components/util/constants/styles";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { Consultingv2Query } from "@/tina/types";
import _ from "lodash";
import React from "react";

type ConsultingV2PageProps<T> = {
  tinaProps: {
    data: Consultingv2Query;
    query: string;
    variables: object;
  };
  props: T;
};

const ConsultingV2 = React.memo(
  function ConsultingV2({ tinaProps }: ConsultingV2PageProps<object>) {
    const { data } = tinaProps;
    return (
      <>
        {}
        <div className="dark flex h-full flex-col">
          <Section color={SectionColor.ToggleLightMode}>
            <Container
              size="custom"
              width="custom"
              padding="custom"
              className="w-full p-0"
            >
              <div className="w-full">
                <Blocks
                  prefix={"Consultingv2Blocks"}
                  blocks={data.consultingv2.blocks}
                />
              </div>
            </Container>
          </Section>
          <PreFooter />
        </div>
      </>
    );
  },
  (prevProps, nextProps) => {
    return _.isEqual(prevProps.tinaProps.data, nextProps.tinaProps.data);
  }
);
export default ConsultingV2;
