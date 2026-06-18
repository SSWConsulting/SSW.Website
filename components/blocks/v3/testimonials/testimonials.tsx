"use client";
import AlternatingText from "@/components/alternating-text";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import Image from "next/image";
import { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { tinaField } from "tinacms/dist/react";

export function V3Testimonials({ data }) {
  const testimonials = data?.testimonials ?? [];
  const [active, setActive] = useState(0);

  if (testimonials.length === 0) return null;

  // Guard against the active index pointing past a shortened list while editing.
  const current = testimonials[Math.min(active, testimonials.length - 1)];

  const goPrev = () =>
    setActive((i) => (i - 1 + testimonials.length) % testimonials.length);
  const goNext = () => setActive((i) => (i + 1) % testimonials.length);

  return (
    <V2ComponentWrapper data={data}>
      <Container size="custom" className="py-16 sm:px-8 md:py-24">
        <div className="flex flex-row items-center justify-center gap-20">
          {/* Quote + author */}
          <div className="flex max-w-3xl flex-col">
            {current?.quote && (
              <blockquote
                data-tina-field={tinaField(current, "quote")}
                className="text-2xl font-medium leading-snug text-white md:text-4xl"
              >
                <AlternatingText text={current.quote} />
              </blockquote>
            )}

            <div className="mt-10 flex items-center justify-between gap-4">
              <div className='flex items-center gap-4'>
                <div className="flex flex-col">
                {current?.authorName && (
                  <span
                    data-tina-field={tinaField(current, "authorName")}
                    className="font-semibold text-white"
                  >
                    {current.authorName}
                  </span>
                )}
                {current?.authorTitle && (
                  <span
                    data-tina-field={tinaField(current, "authorTitle")}
                    className="text-sm text-gray-400"
                  >
                    {current.authorTitle}
                  </span>
                )}
              </div>

              {current?.companyLogo && (
                <>
                  <span className="h-10 w-px bg-gray-600" />
                  <Image
                    src={current.companyLogo}
                    alt={current?.companyLogoAlt ?? "Company logo"}
                    width={160}
                    height={160}
                    className="h-12 w-auto object-contain brightness-0 invert"
                    data-tina-field={tinaField(current, "companyLogo")}
                  />
                </>
              )}
              </div>
              
              {/* Carousel controls */}
              {testimonials.length > 1 && (
                <div className=" flex  gap-3">
                  <button
                    type="button"
                    aria-label="Previous testimonial"
                    onClick={goPrev}
                    className="flex size-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200"
                  >
                    <BiLeftArrowAlt className="size-6" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next testimonial"
                    onClick={goNext}
                    className="flex size-12 items-center justify-center rounded-full bg-white text-black transition hover:bg-gray-200"
                  >
                    <BiRightArrowAlt className="size-6" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Author image */}
          {current?.authorImage && (
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl md:h-48 md:w-48">
              <Image
                src={current.authorImage}
                alt={
                  current?.authorImageAlt ??
                  current?.authorName ??
                  "Testimonial author"
                }
                fill
                className="object-cover"
                data-tina-field={tinaField(current, "authorImage")}
              />
            </div>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
