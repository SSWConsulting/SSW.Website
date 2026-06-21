"use client";

import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { TiArrowRight } from "react-icons/ti";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export function V3Faq({ data }) {
  const faqs = data?.faqs ?? [];
  // Items toggle independently so any number can be open at once;
  // the first item starts open to match the design.
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set([0])
  );

  const toggle = (index: number) =>
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-16 md:py-24"
      >
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
            const isOpen = openIndexes.has(index);
            return (
              <div
                key={`v3-faq-${index}`}
                className="border-t-0.75 border-white/10 last:border-b-0.75"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
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
                      {faq?.link && (
                        <Link
                          href={faq.link}
                          data-tina-field={tinaField(faq, "link")}
                          className="group mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-white transition hover:text-sswRed"
                        >
                          Read More
                          <TiArrowRight className="size-5 transition group-hover:translate-x-1" />
                        </Link>
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
