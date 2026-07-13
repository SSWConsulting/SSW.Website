"use client";
import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { heroMediaRegistry } from "./media/registry";

export const V3Hero = ({ data, priority = false }) => {
  const image = data?.image;
  const mediaType = data?.mediaType ?? "image";
  const MediaComponent =
    mediaType !== "image" ? heroMediaRegistry[mediaType] : undefined;
  const hasImage =
    mediaType === "image" &&
    image?.imageSource &&
    image?.imageWidth &&
    image?.imageHeight;

  return (
    <V2ComponentWrapper data={data} className="py-20">
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="mx-auto flex max-w-7xl flex-col items-center py-20 lg:grid lg:grid-cols-2"
      >
        {/* Left-hand side: brow, title, description, buttons */}
        <div className="flex w-full flex-col text-center lg:text-left">
          {data?.brow && (
            <span
              data-tina-field={tinaField(data, "brow")}
              className="mb-3 font-mono text-sm uppercase tracking-wider text-sswRed"
            >
              {data.brow}
            </span>
          )}
          {data?.heading && (
            <h1
              data-tina-field={tinaField(data, "heading")}
              className="p-0 text-4xl text-white lg:text-5xl"
            >
              <AlternatingText text={data.heading} />
            </h1>
          )}
          {data?.description && (
            <div
              data-tina-field={tinaField(data, "description")}
              className="relative mx-auto mt-4 w-full max-w-prose lg:mx-0"
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
          <ButtonRow
            data={data}
            className={cn("mt-6 flex-wrap justify-center lg:justify-start")}
          />
        </div>

        {/* Right-hand side: registered animated media takes precedence,
            otherwise fall back to the Tina image. */}
        {MediaComponent ? (
          <div className="relative flex w-full justify-center pt-12 lg:justify-end lg:pt-0">
            <MediaComponent />
          </div>
        ) : (
          hasImage && (
            <div className="relative ml-0 mt-4 flex w-full justify-center md:ml-4 xl:mt-0">
              <Image
                width={image.imageWidth}
                height={image.imageHeight}
                priority={priority}
                // next/image's `priority` alone no longer emits the
                // fetchpriority="high" hint, and Lighthouse flags the LCP image
                // without it.
                fetchPriority={priority ? "high" : undefined}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="w-full rounded-md"
                src={image.imageSource}
                alt={image.altText ?? "Hero image"}
                data-tina-field={tinaField(data, "image")}
              />
            </div>
          )
        )}
      </Container>
    </V2ComponentWrapper>
  );
};
