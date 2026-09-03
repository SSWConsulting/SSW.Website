"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { backgroundOptions } from "@/components/blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { FiArrowDown, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

// Fallback scoop fill when the section's background colour has no matching hex
// (e.g. an unset/legacy value) — SSW dark gray, the default section background.
const DEFAULT_SCOOP_COLOR = "#090909";

// Speaker headshots shown on the right of the banner. The photo comes from the
// referenced presenter unless the slide overrides it with its own image.
const SlideSpeakers = ({ slide, className = "" }) => {
  const speakers = (slide?.speakers ?? [])
    .filter(Boolean)
    .map((speaker) => ({
      image: speaker?.image?.imageSource || speaker?.presenter?.profileImg,
      altText: speaker?.image?.altText,
      name: speaker?.presenter?.presenter?.name,
      position: speaker?.role || speaker?.presenter?.position,
    }))
    .filter((speaker) => speaker.image);

  if (speakers.length === 0) return null;

  return (
    <div
      className={cn(
        "flex shrink-0 items-start gap-3 sm:gap-6",
        // Two speakers stack vertically on tablet, as in the design.
        speakers.length > 1 && "sm:flex-col lg:flex-row",
        className
      )}
      data-tina-field={tinaField(slide, "speakers")}
    >
      {speakers.map((speaker, index) => (
        <figure
          key={`hero-slide-speaker-${index}`}
          className="m-0 flex flex-col items-center text-center"
        >
          <Image
            src={speaker.image}
            alt={speaker.altText ?? speaker.name ?? "Speaker"}
            width={260}
            height={260}
            className="size-14 rounded-full bg-sswRed object-cover object-top sm:size-36 lg:size-44"
          />
          {speaker.name && (
            <figcaption
              className={cn(
                "mt-2 max-w-28 text-white sm:max-w-48",
                // With two speakers there is no room for captions until desktop.
                speakers.length > 1 && "hidden lg:block"
              )}
            >
              <span className="block text-sm font-bold sm:text-base">
                {speaker.name}
              </span>
              {speaker.position && (
                <span className="block text-sm text-white/80 sm:text-base">
                  {speaker.position}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
};

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
    <div className="absolute bottom-3 left-1/2 flex w-full -translate-x-1/2 items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => slideLeft()}
        className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-black/70 text-black transition-colors hover:bg-black hover:text-white dark:border-white/80 dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        <FiArrowLeft className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => slideRight()}
        className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-black/70 text-black transition-colors hover:bg-black hover:text-white dark:border-white/80 dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        <FiArrowRight className="size-5" />
      </button>
    </div>
  );

  // With a single slide there are no prev/next controls, so fill the scoop with
  // a scroll-down affordance instead of leaving the notch empty.
  const scrollDownButton = slides.length <= 1 && (
    <div className="absolute bottom-3 left-1/2 flex w-full -translate-x-1/2 items-center justify-center">
      <button
        type="button"
        aria-label="Scroll to content"
        onClick={(e) => {
          // Scroll the arrow 10% of the viewport height past the top of the
          // screen, clearing the hero out of the way.
          const { top } = e.currentTarget.getBoundingClientRect();
          window.scrollTo({
            top: window.scrollY + top + window.innerHeight * 0.1,
            behavior: "smooth",
          });
        }}
        className="pointer-events-auto flex size-11 items-center justify-center rounded-full border border-black/70 text-black transition-colors hover:bg-black hover:text-white dark:border-white/80 dark:text-white dark:hover:bg-white dark:hover:text-black"
      >
        <FiArrowDown className="size-5" />
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

  // The scoop reveals what sits beneath the hero, so it must match the next
  // section's background. Light is the gray-50 section below; dark uses the
  // configured section hex. The light/dark swap is done by the `.dark` class in
  // CSS (not JS), so it resolves on first paint with no theme flash.
  const scoopDarkColor =
    backgroundOptions.find(
      (option) => option.reference === data?.background?.backgroundColour
    )?.hex ?? DEFAULT_SCOOP_COLOR;

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
                quality={75}
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
                "absolute inset-0 z-2 hidden bg-[linear-gradient(90deg,_rgba(102,33,33,0.4)_10%,_rgba(178,57,57,0.4)_30%,_rgba(153,49,49,0.1)_55%,_rgba(128,41,41,0.05)_100%)] lg:block"
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
                    "col-start-1 row-start-1 grid w-full grid-cols-1 items-start gap-4 p-8 transition-[opacity,visibility] duration-500 sm:grid-cols-[1fr_auto] sm:gap-8 sm:p-12 lg:p-16",
                    index === current
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  )}
                >
                  <div className="flex w-full max-w-2xl flex-col">
                    {slide?.heading && (
                      <Heading
                        data-tina-field={tinaField(slide, "heading")}
                        className="m-0 p-0 text-3xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
                      >
                        <AlternatingText text={slide.heading} />
                      </Heading>
                    )}
                    {slide?.eventDate && (
                      <p
                        data-tina-field={tinaField(slide, "eventDate")}
                        className="mt-4 text-base text-white/90"
                      >
                        {slide.eventDate}
                      </p>
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
                              <p
                                {...props}
                                className="text-base text-white/90"
                              />
                            ),
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <SlideSpeakers
                    slide={slide}
                    className="sm:row-span-2 sm:self-center"
                  />
                  <ButtonRow
                    data={slide}
                    className="mb-16 flex-wrap justify-start sm:mb-0"
                  />
                </div>
              );
            })}
          </div>

          {slidePagination}

          {/* Scroll-down indicator nested in a concave scoop */}

          <div
            className={cn(
              "pointer-events-none absolute bottom-0 left-1/2 z-20 block w-[280px] -translate-x-1/2 sm:left-auto sm:right-16 sm:w-[380px] sm:translate-x-0"
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
                className="home-scoop-fill"
                style={{ "--home-scoop-dark": scoopDarkColor } as CSSProperties}
              />
            </svg>
            {prevAndNextSlideButtons}
            {scrollDownButton}
          </div>
        </div>
      </Container>
    </V2ComponentWrapper>
  );
};
