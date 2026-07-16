"use client";

import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { LeadCaptureForm } from "./leadCaptureForm";

export function V3LeadCapture({ data }) {
  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-16 md:py-24"
      >
        {/* Intro */}
        {(data?.brow || data?.heading || data?.description) && (
          <div className="mx-auto mb-10 max-w-3xl text-center">
            {data?.brow && (
              <span
                data-tina-field={tinaField(data, "brow")}
                className="block font-mono text-sm uppercase tracking-wider text-sswRed"
              >
                {data.brow}
              </span>
            )}
            {data?.heading && (
              <h2
                id="lead-capture-heading"
                data-tina-field={tinaField(data, "heading")}
                className="my-4 scroll-mt-24 text-3xl text-white lg:text-4xl"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
            {data?.description && (
              <div
                data-tina-field={tinaField(data, "description")}
                className="mx-auto mt-4 max-w-prose"
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
        )}

        <LeadCaptureForm successMessage="A senior React engineer will be in touch with you shortly." />
      </Container>
    </V2ComponentWrapper>
  );
}
