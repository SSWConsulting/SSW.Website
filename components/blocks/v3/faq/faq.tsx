"use client";

import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function V3Faq({ data }) {
  const faqs = data?.faqs ?? [];
  // First item open by default, matching the design.
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" padding="px-4 sm:px-8" className="py-16 md:py-24">
        {data?.heading && (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="text-center text-3xl text-white lg:text-4xl"
          >
            <AlternatingText text={data.heading} />
          </h2>
        )}

        <div className="mx-auto mt-12 max-w-3xl">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`v3-faq-${index}`}
                className="border-t-[0.75px] border-white/10 last:border-b-[0.75px]"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span
                    data-tina-field={tinaField(faq, "question")}
                    className="text-base font-medium text-white"
                  >
                    {faq?.question}
                  </span>
                  <FiChevronDown
                    aria-hidden
                    className={cn(
                      "size-5 shrink-0 text-sswRed transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-in-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden">
                    <div
                      data-tina-field={tinaField(faq, "answer")}
                      className="pb-5 pr-8"
                    >
                      {faq?.answer && (
                        <TinaMarkdown
                          content={faq.answer}
                          components={{
                            p: (props) => (
                              <p
                                {...props}
                                className="text-base font-light text-gray-400"
                              />
                            ),
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
