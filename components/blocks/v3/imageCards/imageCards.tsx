import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { backgroundOptions } from "@/components/blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { CarouselMoreCard } from "../shared/carouselMoreCard";
import Image from "next/image";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { tinaField } from "tinacms/dist/react";

function ImageCard({ card, cardBackgroundClass, showBorder }) {
  const inner = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border-0.75 border-sswBorder transition",
        showBorder && "border-0.75 border-sswBorder"
      )}
    >
      {/* Card-body background sits on its own layer so we can fade it from
          60% at rest to full on hover without touching the text or graphic.
          Works for both solid and gradient background options. */}
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-100",
          cardBackgroundClass
        )}
      />
      <div
        className={cn(
          "relative flex aspect-[4/3] items-center justify-center bg-sswRed p-4 sm:p-8"
        )}
      >
        {card?.graphic?.imageSource && (
          <div className={cn("relative size-40 max-w-[70%]")}>
            <Image
              src={card.graphic.imageSource}
              alt={card.graphic.altText ?? card?.title ?? ""}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-semibold text-white">{card?.title}</h3>
        {card?.description && (
          <p className="mt-4 text-base font-light text-gray-400">
            {card.description}
          </p>
        )}
        <span className="mt-auto flex size-10 shrink-0 scale-100 items-center justify-center self-end rounded-full bg-white p-2 text-black transition-all duration-300 ease-in-out group-hover:rotate-45 group-hover:scale-125">
          <BsArrowUpRight className="size-4" />
        </span>
      </div>
    </div>
  );

  return card?.link ? (
    <Link
      href={card.link}
      target={card?.newTab ? "_blank" : undefined}
      rel={card?.newTab ? "noopener noreferrer" : undefined}
      data-tina-field={tinaField(card, "title")}
      className="h-full !no-underline"
    >
      {inner}
    </Link>
  ) : (
    <div data-tina-field={tinaField(card, "title")} className="h-full">
      {inner}
    </div>
  );
}

export function V3ImageCards({ data }) {
  const cards = data?.cards ?? [];
  const showBorder = data?.showBorder ?? true;
  const cardBackgroundClass =
    backgroundOptions.find(
      (option) => option.reference === data?.cardBackgroundColour
    )?.classes ?? "bg-sswCard";

  // 3-up when the count divides evenly by 3 but not by 4 (e.g. 3, 6, 9),
  // otherwise keep the default 4-up grid.
  const lgColumnsClass =
    cards.length % 3 === 0 && cards.length % 4 !== 0
      ? "lg:grid-cols-3"
      : "lg:grid-cols-4";

  const moreLink = data?.mobilePlusMore;
  const seeMoreButtons = data?.seeMoreButton ?? [];

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        width="custom"
        padding="px-0 lg:px-8"
        className="max-w-screen-xl py-24"
      >
        {data?.brow && (
          <span
            data-tina-field={tinaField(data, "brow")}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sswRed"
          >
            {data.brow}
          </span>
        )}
        {data?.heading && (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="my-4 max-w-2xl px-8 text-3xl text-white lg:px-0 lg:text-5xl"
          >
            <AlternatingText text={data.heading} />
          </h2>
        )}
        {data?.subtitle && (
          <p
            data-tina-field={tinaField(data, "subtitle")}
            className="max-w-3xl px-8 text-base font-light text-gray-400 lg:px-0"
          >
            {data.subtitle}
          </p>
        )}

        {cards.length > 0 && (
          <>
            {/* Below lg: horizontal finite carousel with a "+ more" end cap */}
            <Carousel
              opts={{ align: "start", loop: false, dragFree: true }}
              autoplay={false}
              className="mt-12 lg:hidden"
            >
              <CarouselContent className="ml-0">
                {cards.map((card, index) => (
                  <CarouselItem
                    key={`v3-image-card-${index}`}
                    className={cn(
                      "basis-4/5 pl-6 sm:basis-1/2 md:min-w-[380px] md:basis-1/3"
                    )}
                  >
                    <ImageCard
                      card={card}
                      cardBackgroundClass={cardBackgroundClass}
                      showBorder={showBorder}
                    />
                  </CarouselItem>
                ))}
                {moreLink && (
                  <CarouselItem className="basis-2/3 pl-6 sm:basis-1/3 md:basis-1/4">
                    <CarouselMoreCard href={moreLink} />
                  </CarouselItem>
                )}
              </CarouselContent>
            </Carousel>

            {/* lg+ : grid */}
            <div className={cn("mt-12 hidden gap-8 lg:grid", lgColumnsClass)}>
              {cards.map((card, index) => (
                <ImageCard
                  key={`v3-image-card-${index}`}
                  card={card}
                  cardBackgroundClass={cardBackgroundClass}
                  showBorder={showBorder}
                />
              ))}
            </div>

            {seeMoreButtons.length > 0 && (
              <div className="mt-8 flex justify-end px-8 lg:px-0">
                <ButtonRow
                  className="mt-0 hidden justify-end lg:block"
                  data={{ buttons: seeMoreButtons }}
                />
              </div>
            )}
          </>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
