import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function V3Cta({ data }) {
  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="flex flex-col items-center py-24 text-center md:py-32"
      >
        {data?.heading && (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="max-w-3xl text-4xl text-white lg:text-6xl"
          >
            <AlternatingText text={data.heading} />
          </h2>
        )}
        {data?.description && (
          <div
            data-tina-field={tinaField(data, "description")}
            className="mt-6 max-w-sm lg:max-w-2xl"
          >
            <TinaMarkdown
              content={data.description}
              components={{
                p: (props) => (
                  <p
                    {...props}
                    className="text-base font-light text-gray-300"
                  />
                ),
              }}
            />
          </div>
        )}
        <ButtonRow data={data} className="mt-8 items-center justify-center" />
      </Container>
    </V2ComponentWrapper>
  );
}
