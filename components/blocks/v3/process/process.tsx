import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function V3Process({ data }) {
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
              className="mt-4 max-w-3xl"
            >
              <TinaMarkdown
                content={data.description}
                components={{
                  p: (props) => (
                    <p
                      {...props}
                      className="py-2 text-base font-light text-gray-300"
                    />
                  ),
                }}
              />
            </div>
          )}
        </div>

        {/* Numbered steps: circled number + connector line */}
        {data?.steps?.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {data.steps.map((step, index) => {
              const isExternal = /^https?:\/\//.test(step?.link ?? "");
              const inner = (
                <>
                  <div className="flex items-center">
                    <span className="relative flex size-9 shrink-0 items-center justify-center rounded-full border-0.5 border-sswRed/60 font-mono text-sm text-sswRed">
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 -z-10 scale-165 rounded-full bg-red-radial opacity-40 blur-sm"
                      />
                      {String(index + 1).padStart(2)}
                    </span>
                    <span className="ml-3 h-px flex-1 bg-gradient-to-r from-sswRed/60 to-transparent" />
                  </div>
                  {step?.heading && (
                    <h3
                      data-tina-field={tinaField(step, "heading")}
                      className="mt-5 text-xl text-white"
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
                </>
              );

              return step?.link ? (
                <Link
                  key={`v3-process-step-${index}`}
                  href={step.link}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="group flex flex-col !no-underline transition-transform duration-200 hover:-translate-y-1"
                >
                  {inner}
                </Link>
              ) : (
                <div key={`v3-process-step-${index}`} className="flex flex-col">
                  {inner}
                </div>
              );
            })}
          </div>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
