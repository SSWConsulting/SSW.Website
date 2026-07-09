"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { backgroundOptions } from "@/components/blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const V3HeroBox = ({ data, priority = false }) => {
  // The block's own fields form the first slide; `slides` adds more of the same shape.
  const slides = [data, ...(data?.slides ?? []).filter(Boolean)];
  const [activeSlide, setActiveSlide] = useState(0);
  const current = Math.min(activeSlide, slides.length - 1);
  const hasImage = slides[current]?.backgroundMedia?.imageSource;

  function slideLeft() {
    setActiveSlide((current - 1 + slides.length) % slides.length);
  }

  function slideRight() {
    setActiveSlide((current + 1) % slides.length);
  }

  const prevAndNextSlideButtons = slides.length > 1 && (
    <div className="absolute bottom-1/2 left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => slideLeft()}
        className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white hover:text-black"
      >
        <FiArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => slideRight()}
        className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white hover:text-black"
      >
        <FiArrowRight className="size-5" />
      </button>
    </div>
  );

  const slidePagination = slides.length > 1 && (
    <div className="absolute bottom-6 left-8 z-20 flex items-center gap-4 sm:left-12 lg:left-16">
      <div className="flex items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={`hero-slide-section-${index}`}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveSlide(index)}
            className={cn(
              "h-1 w-20 transition-colors",
              index === current ? "bg-white" : "bg-white/40 hover:bg-white/70"
            )}
          />
        ))}
      </div>
    </div>
  );

  const scoopColor = backgroundOptions.find(
    (option) => option.reference === data?.background?.backgroundColour
  )?.hex;

  return (
    <V2ComponentWrapper data={data} className="pt-4 sm:pt-20">
      <Container
        size="custom"
        width="custom"
        padding="px-4 sm:px-8"
        className="max-w-9xl"
      >
        <div
          className={cn(
            "relative flex min-h-[28rem] w-full items-center overflow-hidden rounded-feature bg-black sm:min-h-[34rem] lg:min-h-128"
          )}
        >
          {/* Background images, anchored to the right of the box, cross-fading between slides */}
          {slides.map((slide, index) =>
            slide?.backgroundMedia?.imageSource ? (
              <Image
                key={`hero-slide-image-${index}`}
                fill
                priority={priority && index === 0}
                fetchPriority={priority && index === 0 ? "high" : undefined}
                quality={100}
                sizes="(min-width: 1440px) 1312px, 100vw"
                src={slide.backgroundMedia.imageSource}
                alt={slide.backgroundMedia.altText ?? "Hero background"}
                className={cn(
                  "object-cover object-right transition-opacity duration-500",
                  index === current ? "opacity-60 lg:opacity-100" : "opacity-0"
                )}
                data-tina-field={tinaField(slide, "backgroundMedia")}
              />
            ) : null
          )}
          {hasImage && (
            <div
              aria-hidden="true"
              className={cn(
                "z-[2] absolute inset-0 hidden bg-[linear-gradient(90deg,_rgba(102,33,33,0.4)_10%,_rgba(178,57,57,0.4)_30%,_rgba(153,49,49,0.1)_55%,_rgba(128,41,41,0.05)_100%)] lg:block"
              )}
            />
          )}

          {/* Content*/}
          <div className="relative z-10 grid w-full">
            {slides.map((slide, index) => {
              const Heading = index === 0 ? "h1" : "h2";
              return (
                <div
                  key={`hero-slide-content-${index}`}
                  className={cn(
                    "col-start-1 row-start-1 flex w-full max-w-2xl flex-col p-8 transition-[opacity,visibility] duration-500 sm:p-12 lg:p-16",
                    index === current
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  )}
                >
                  {slide?.heading && (
                    <Heading
                      data-tina-field={tinaField(slide, "heading")}
                      className="m-0 p-0 text-3xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                    >
                      <AlternatingText text={slide.heading} />
                    </Heading>
                  )}
                  {slide?.description && (
                    <div
                      data-tina-field={tinaField(slide, "description")}
                      className="mt-4 max-w-md"
                    >
                      <TinaMarkdown
                        content={slide.description}
                        components={{
                          p: (props) => (
                            <p {...props} className="text-base text-white/90" />
                          ),
                        }}
                      />
                    </div>
                  )}
                  <ButtonRow
                    data={slide}
                    className="mb-16 mt-8 flex-wrap justify-start sm:mb-0"
                  />
                </div>
              );
            })}
          </div>

          {slidePagination}

          {/* Scroll-down indicator nested in a concave scoop */}

          <div
            className={cn(
              "pointer-events-none absolute bottom-0 z-20 block w-[280px] sm:right-16 sm:w-[380px]"
            )}
          >
            <svg
              viewBox="0 0 336 125"
              preserveAspectRatio="none"
              className={cn("absolute bottom-[-43px] left-0 h-[125px] w-full")}
              aria-hidden="true"
            >
              <path
                d="M168 0C129.336 0 107.496 24.1667 88.224 44.75C68.952 65.3333 51.72 83.3333 12 83.3333C8.8174 83.3333 5.76515 85.5283 3.51472 89.4353C1.26428 93.3423 0 98.6413 0 104.167C0 109.692 1.26428 114.991 3.51472 118.898C5.76515 122.805 8.8174 125 12 125H324C327.183 125 330.235 122.805 332.485 118.898C334.736 114.991 336 109.692 336 104.167C336 98.6413 334.736 93.3423 332.485 89.4353C330.235 85.5283 327.183 83.3333 324 83.3333C284.28 83.3333 267.048 65.3333 247.776 44.75C228.504 24.1667 206.664 0 168 0Z"
                fill={scoopColor}
              />
            </svg>
            {prevAndNextSlideButtons}
          </div>
        </div>
      </Container>
    </V2ComponentWrapper>
  );
};
