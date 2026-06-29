"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { backgroundOptions } from "@/components/blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import Image from "next/image";
import { useRef } from "react";
import { FiArrowDown } from "react-icons/fi";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export const V3HeroBox = ({ data, priority = false }) => {
  const media = data?.backgroundMedia;
  const hasImage = media?.imageSource;
  const scoopColor = backgroundOptions.find(
    (option) => option.reference === data?.background?.backgroundColour
  )?.hex;

  const arrowRef = useRef<HTMLButtonElement>(null);
  const scrollToNext = () => {
    const rect = arrowRef.current?.getBoundingClientRect();
    if (rect) window.scrollBy({ top: rect.top - 50, behavior: "smooth" });
  };

  return (
    <V2ComponentWrapper data={data} className="pt-4 sm:pt-20">
      <Container
        size="custom"
        width="custom"
        padding="px-4 sm:px-8"
        className="max-w-9xl"
      >
        <div
          className="relative flex min-h-[28rem] w-full items-center justify-center sm:justify-start overflow-hidden rounded-[2rem] bg-black sm:min-h-[34rem] lg:min-h-[32rem] lg:rounded-[45px]"
        >
          {/* Background image, anchored to the right of the box */}
          {hasImage && (
            <Image
              fill
              priority={priority}
              fetchPriority={priority ? "high" : undefined}
              sizes="100vw"
              src={media.imageSource}
              alt={media.altText ?? "Hero background"}
              className="object-cover justify-left object-right opacity-30 lg:opacity-100 transition-opacity duration-200"
              data-tina-field={tinaField(data, "backgroundMedia")}
            />
          )}
          {hasImage && (
            <div
              aria-hidden="true"
              className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,_rgba(102,33,33,0.4)_10%,_rgba(178,57,57,0.5)_50%,_rgba(153,49,49,0.25)_75%,_rgba(128,41,41,0.25)_100%)]"
            />
          )}

          {/* Content */}
          <div className="relative z-10 flex w-full max-w-2xl flex-col p-8 sm:p-12 lg:p-16">
            {data?.heading && (
              <h1
                data-tina-field={tinaField(data, "heading")}
                className="p-0 text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                <AlternatingText text={data.heading} />
              </h1>
            )}
            {data?.description && (
              <div
                data-tina-field={tinaField(data, "description")}
                className="mt-4 max-w-md"
              >
                <TinaMarkdown
                  content={data.description}
                  components={{
                    p: (props) => (
                      <p {...props} className="text-base text-white/90" />
                    ),
                  }}
                />
              </div>
            )}
            <ButtonRow data={data} className="mb-16 sm:mb-0 mt-8 flex-wrap justify-start" />
          </div>

          {/* Scroll-down indicator nested in a concave scoop */}
          {data?.showScrollIndicator && (
            <div className="pointer-events-none absolute bottom-0 sm:right-16 z-20 w-[280px] sm:w-[336px] block">
              <svg
                viewBox="0 0 336 125"
                preserveAspectRatio="none"
                className="absolute bottom-[-43px] left-0 h-[125px] w-full"
                aria-hidden="true"
              >
                <path
                  d="M168 0C129.336 0 107.496 24.1667 88.224 44.75C68.952 65.3333 51.72 83.3333 12 83.3333C8.8174 83.3333 5.76515 85.5283 3.51472 89.4353C1.26428 93.3423 0 98.6413 0 104.167C0 109.692 1.26428 114.991 3.51472 118.898C5.76515 122.805 8.8174 125 12 125H324C327.183 125 330.235 122.805 332.485 118.898C334.736 114.991 336 109.692 336 104.167C336 98.6413 334.736 93.3423 332.485 89.4353C330.235 85.5283 327.183 83.3333 324 83.3333C284.28 83.3333 267.048 65.3333 247.776 44.75C228.504 24.1667 206.664 0 168 0Z"
                  fill={scoopColor}
                />
              </svg>
              <button
                ref={arrowRef}
                type="button"
                aria-label="Scroll to next section"
                onClick={scrollToNext}
                className="group pointer-events-auto absolute bottom-3 left-1/2 flex size-11 -translate-x-1/2 items-center justify-center rounded-full border border-white/80 text-white transition-colors hover:bg-white hover:text-black"
              >
                <FiArrowDown className="size-5 transition-transform group-hover:translate-y-0.5" />
              </button>
            </div>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
};
