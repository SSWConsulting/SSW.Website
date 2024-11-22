"use client";

import { Blocks } from "@/components/blocks-renderer";
import { BuiltOnAzure } from "@/components/blocks/builtOnAzure";
import { Container } from "@/components/util/container";
import { Section } from "@/components/util/section";
import { useTina } from "tinacms/dist/react";

export default function ConsultingV2({ props }) {
  const { data } = props;

  useTina(data);
  return (
    <>
      <Section className="mb-16">
        <Container padding="px-4" className="flex w-full flex-wrap">
          {data.consultingv2.blocks ? (
            <div>
              <Blocks
                prefix={"ConsultingV2AfterBody"}
                blocks={data.consultingv2.blocks}
              />
            </div>
          ) : (
            <></>
          )}
        </Container>
      </Section>
      <Section>
        <BuiltOnAzure data={{ backgroundColor: "default" }} />
      </Section>
    </>
  );
}
