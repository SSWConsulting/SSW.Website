"use client";
import { Blocks } from "@/components/blocks-renderer";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import _ from "lodash";
import React, { memo } from "react";
import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";

export type EventsV2Data = Awaited<ReturnType<typeof client.queries.eventsv2>>;

type EventsV2PageProps<T> = {
  tinaProps: EventsV2Data;
  props: T;
};

const Events2 = memo(
  function Events2({ tinaProps }: EventsV2PageProps<object>) {
    const { data } = useTina({
      data: tinaProps.data,
      query: tinaProps.query,
      variables: tinaProps.variables,
    });
    const { blocks, azureBanner } = data.eventsv2;
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
              <div className="w-full">
                {blocks ? (
                  <Blocks prefix={"Consultingv2Blocks"} blocks={blocks} />
                ) : (
                  <></>
                )}
              </div>
            </Container>
          </Section>
          <PreFooter data={azureBanner} />
        </div>
      </>
    );
  },

  (prevProps, nextProps) => _.isEqual(prevProps, nextProps)
);

export default Events2;
