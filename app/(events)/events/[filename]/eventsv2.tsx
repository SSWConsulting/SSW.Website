"use client";
import { Blocks } from "@/components/blocks-renderer";
import { PreFooter } from "@/components/layout/footer/pre-footer";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import _ from "lodash";
import React, { memo } from "react";
import client from "../../../../tina/__generated__/client";

export type EventsV2Data = Awaited<ReturnType<typeof client.queries.eventsv2>>;

type EventsV2PageProps<T> = {
  tinaProps: EventsV2Data;
  props: T;
};

const EventsV2Page = memo(
  function EventsV2Page({ tinaProps }: EventsV2PageProps<object>) {
    const { blocks, azureBanner } = tinaProps.data.eventsv2;
    return (
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
                <Blocks prefix={"Eventsv2Blocks"} blocks={blocks} />
              ) : (
                <></>
              )}
            </div>
          </Container>
        </Section>
        <PreFooter data={azureBanner} />
      </div>
    );
  },
  (prevProps, newProps) => _.isEqual(prevProps, newProps)
);

export default EventsV2Page;
