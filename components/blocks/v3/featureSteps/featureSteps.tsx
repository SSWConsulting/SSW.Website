import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function V3FeatureSteps({ data }) {
  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-12 md:py-16"
      >
        {/* Full-width intro: brow, title, description */}
        <div className="flex w-full flex-col">
          {data?.brow && (
            <span
              data-tina-field={tinaField(data, "brow")}
              className="font-mono text-sm uppercase tracking-wider text-sswRed"
            >
              {data.brow}
            </span>
          )}
          {data?.heading && (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="my-4 text-3xl text-white lg:text-4xl"
            >
              <AlternatingText text={data.heading} />
            </h2>
          )}
          {data?.description && (
            <div
              data-tina-field={tinaField(data, "description")}
              className="max-w-3xl"
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
        </div>

        {/* Numbered steps: 01 / 02 / 03 */}
        {data?.steps?.length > 0 && (
          <div className={"mt-10 grid grid-cols-1 md:grid-cols-3"}>
            {data.steps.map((step, index) => (
              <div
                key={`v3-step-${index}`}
                className={cn(
                  "flex flex-col border-t-0.75 border-sswBorder px-2 py-6 lg:px-4",
                  index % 2 !== 0 && "border-sswBorder md:pl-8 lg:border-x-0.75"
                )}
              >
                {step?.brow && (
                  <span
                    data-tina-field={tinaField(step, "brow")}
                    className="font-mono text-sm uppercase tracking-wider text-sswRed"
                  >
                    {step.brow}
                  </span>
                )}
                {step?.heading && (
                  <h3
                    data-tina-field={tinaField(step, "heading")}
                    className="mt-2 text-xl text-white"
                  >
                    <AlternatingText text={step.heading} />
                  </h3>
                )}
                {step?.description && (
                  <div className="mt-2">
                    <TinaMarkdown
                      content={step.description}
                      components={{
                        p: (props) => (
                          <p
                            {...props}
                            className="py-1 text-base font-light text-gray-300"
                          />
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
