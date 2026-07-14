import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { Icon } from "@/components/blocksSubtemplates/tinaFormElements/icon";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Container } from "@/components/util/container";
import { VideoModal } from "@/components/videoModal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

function Highlight({ item }) {
  return (
    <div className="flex flex-col">
      {item?.title && (
        <h3
          data-tina-field={tinaField(item, "title")}
          className="text-xl font-semibold text-foreground"
        >
          {item.title}
        </h3>
      )}
      {item?.highlightBody && (
        <p
          data-tina-field={tinaField(item, "highlightBody")}
          className="mt-3 text-base font-light text-muted-foreground"
        >
          {item.highlightBody}
        </p>
      )}
    </div>
  );
}

function Badge({ badge }) {
  return (
    <div
      data-tina-field={tinaField(badge, "label")}
      className="inline-flex min-h-9 items-center gap-2 rounded-full border-1 border-hairline bg-white px-4 py-2 text-sm text-foreground dark:border-white/5 dark:bg-sswCard dark:text-white"
    >
      {badge?.customImage?.imageSource ? (
        <span className="relative size-4 shrink-0">
          <Image
            src={badge.customImage.imageSource}
            alt={badge.customImage.altText ?? ""}
            fill
            sizes="16px"
            className="object-contain"
          />
        </span>
      ) : (
        badge?.icon && (
          <Icon
            data={{ name: badge.icon }}
            tinaField={tinaField(badge, "icon")}
            className="size-4 shrink-0 text-foreground dark:text-white"
          />
        )
      )}
      <span>{badge?.label}</span>
    </div>
  );
}

export function V3VideoFeature({ data }) {
  const highlights = (data?.highlights ?? []).filter(Boolean);
  const badges = (data?.badges ?? data?.recognitionBadges ?? []).filter(
    Boolean
  );
  const showRecognition = Boolean(data?.recognitionHeading || badges.length);

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="max-w-screen-xl py-24 md:py-32"
      >
        <div className="grid gap-8 lg:grid-cols-5 lg:items-stretch">
          {data?.videoUrl && (
            <div className="min-w-0 lg:col-span-3">
              <div
                data-tina-field={tinaField(data, "videoUrl")}
                className={cn(
                  "overflow-hidden rounded-card",
                  data?.greyscaleThumbnail && "[&_img]:grayscale"
                )}
              >
                <VideoModal
                  url={data.videoUrl}
                  thumbnail={data.thumbnail || undefined}
                  roundedEdges
                />
              </div>
            </div>
          )}

          <div className="flex h-full flex-col rounded-card border-1 border-hairline bg-white p-6 md:p-8 lg:col-span-2 dark:border-white/5 dark:bg-sswCard">
            {data?.brow && (
              <span
                data-tina-field={tinaField(data, "brow")}
                className="font-mono text-xs uppercase tracking-wider text-sswRed"
              >
                {data.brow}
              </span>
            )}
            {data?.heading && (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="m-0 text-3xl leading-tight text-foreground lg:text-4xl"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
            {data?.introText && (
              <p
                data-tina-field={tinaField(data, "introText")}
                className="mt-6 text-base font-light text-muted-foreground"
              >
                {data.introText}
              </p>
            )}
            {data?.buttons?.length > 0 && (
              <ButtonRow data={data} className="mt-auto hidden pt-10 lg:flex" />
            )}
          </div>
        </div>

        {data?.videoCaption && (
          <div className="grid lg:grid-cols-5">
            <p
              data-tina-field={tinaField(data, "videoCaption")}
              className="mt-4 text-sm text-muted-foreground lg:col-span-3"
            >
              {data.videoCaption}
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-10 lg:grid-cols-5">
          {highlights.length > 0 && (
            <>
              <div className="hidden gap-16 lg:col-span-3 lg:grid lg:grid-cols-2">
                {highlights.map((item, index) => (
                  <Highlight key={`v3-why-highlight-${index}`} item={item} />
                ))}
              </div>

              <Carousel
                opts={{ align: "start", loop: false, dragFree: true }}
                autoplay={false}
                className="lg:hidden"
              >
                <CarouselContent className="ml-0">
                  {highlights.map((item, index) => (
                    <CarouselItem
                      key={`v3-why-highlight-mobile-${index}`}
                      className="basis-4/5 pl-6 sm:basis-1/2"
                    >
                      <Highlight item={item} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </>
          )}

          {showRecognition && (
            <div className="flex flex-col items-center gap-4 lg:col-span-2 lg:items-center">
              {data?.recognitionHeading && (
                <span
                  data-tina-field={tinaField(data, "recognitionHeading")}
                  className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
                >
                  {data.recognitionHeading}
                </span>
              )}
              {badges.length > 0 && (
                <div className="flex flex-col items-center gap-3">
                  {badges.map((badge, index) => (
                    <Badge
                      key={`v3-video-feature-badge-${index}`}
                      badge={badge}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
}
