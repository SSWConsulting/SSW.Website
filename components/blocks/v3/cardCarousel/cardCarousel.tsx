"use client";

import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import V2ComponentWrapper from "@/components/layout/v2ComponentWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPickItem,
  useCarousel,
} from "@/components/ui/carousel";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { VideoModal } from "@/components/videoModal";
import Image from "next/image";
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
// Reuse the existing GUID-linked tab logic; only the tab styling differs in v3.
import {
  Tabs,
  useTabCarousel,
} from "../../cardCarousel/layout/cardCarouselTabs";

type V3CardProps = {
  data;
  placeholder: boolean;
  className?: string;
};

// v3 card: dark surface, soft border, consistent rounded-2xl styling.
const V3Card = ({ data, placeholder, className }: V3CardProps) => {
  const isYoutubeEmbed = data.mediaType === "youtube";
  const youtubeUrl = data.youtubeUrl;
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const placeholderImage = "/images/videoPlaceholder.png";

  return (
    <div
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-2xl bg-[#212121] text-start",
        className
      )}
    >
      {youtubeUrl && isYoutubeEmbed ? (
        <div className="aspect-video w-full shrink-0 overflow-hidden">
          <VideoModal overflow={true} url={youtubeUrl} />
        </div>
      ) : (
        (data.image || placeholder) && (
          <div
            className="relative aspect-video w-full shrink-0 overflow-hidden"
            data-tina-field={tinaField(data, "image")}
          >
            <Image
              src={
                usePlaceholder
                  ? placeholderImage
                  : (data.image ?? placeholderImage)
              }
              onError={() => setUsePlaceholder(true)}
              alt={data.altText ?? "Card Image"}
              fill={true}
              className={data.contain ? "object-contain" : "object-cover"}
            />
          </div>
        )
      )}
      <div className="flex flex-col p-8">
        {data.category && (
          <span
            data-tina-field={tinaField(data, "category")}
            className="w-fit whitespace-nowrap rounded-full border-0.75 border-sswRed/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-sswRed"
          >
            {data.category}
          </span>
        )}
        {data.heading && (
          <h3
            className="mt-4 text-lg font-medium leading-snug text-white"
            data-tina-field={tinaField(data, "heading")}
          >
            {data.heading}
          </h3>
        )}
      </div>
    </div>
  );
};

type V3CardListProps = {
  cards;
  hasImages: boolean;
};

// Carousel mode: centred slideshow with a faded edge mask and dot navigation.
const V3CardList = ({ cards, hasImages }: V3CardListProps) => {
  return (
    <div className="mask-horizontal-fade">
      <Carousel
        opts={{
          align: "center",
          loop: true,
          containScroll: false,
        }}
        className="w-full max-w-9xl"
        itemLength={cards?.length ?? 0}
      >
        <CarouselContent className="-ml-8">
          {cards?.map((cardData, index) => {
            return (
              <CarouselItem
                className="flex basis-72 pl-8 md:basis-96"
                key={`v3-card-carousel-${index}`}
              >
                <V3Card
                  className="w-full"
                  placeholder={hasImages}
                  data={cardData}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="m-auto flex w-3/4 justify-center gap-2 pt-8">
          {cards?.map((_, index) => {
            return (
              <V3CarouselDot key={`v3-carousel-dot-${index}`} index={index} />
            );
          })}
        </div>
      </Carousel>
    </div>
  );
};

const V3CarouselDot = ({ index }) => {
  const { selectedIndex } = useCarousel();
  return (
    <CarouselPickItem
      className={`h-0.5 w-full max-w-8 rounded-full sm:h-1 ${
        selectedIndex === index ? "bg-gray-200" : "bg-gray-600"
      }`}
      index={index}
    />
  );
};

export function V3CardCarousel({ data }) {
  const [hasImages, setHasImages] = useState(false);
  const { tabsData, activeCategory, categoryGroup } = useTabCarousel({
    categoryGroup: data.categoryGroup,
  });
  const [cardSet, setCardSet] = useState(data.cards);

  useEffect(() => {
    if (activeCategory && data.cards) {
      setCardSet(
        data.cards.filter((card) =>
          activeCategory.cardGuidList.cardGuidList.includes(card.guid)
        )
      );
    }
  }, [activeCategory, data.cards]);

  useEffect(() => {
    setHasImages(data.cards?.some((card) => card.image));
    setCardSet(data.cards);
  }, [data.cards]);

  return (
    <V2ComponentWrapper data={data}>
      <Container
        size="custom"
        padding="px-4 sm:px-8"
        className="py-16 md:py-24"
      >
        <div className="flex flex-col gap-4">
          {data.categoryGroup && (
            <Tabs tabsData={tabsData} categoryGroup={categoryGroup} />
          )}
          <div className="flex w-full flex-col">
            {data.brow && (
              <span
                data-tina-field={tinaField(data, "brow")}
                className="font-mono text-sm uppercase tracking-wider text-sswRed"
              >
                {data.brow}
              </span>
            )}
            {data.isH1 ? (
              <h1
                data-tina-field={tinaField(data, "heading")}
                className="my-4 text-3xl text-white lg:text-4xl"
              >
                <AlternatingText text={data.heading} />
              </h1>
            ) : (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="my-4 text-3xl text-white lg:text-4xl"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
            {data.body && (
              <p
                data-tina-field={tinaField(data, "body")}
                className="max-w-3xl text-base font-light text-gray-300"
              >
                {data.body}
              </p>
            )}
          </div>
          {data.buttons?.length > 0 && (
            <ButtonRow data={data} className="mb-4 mt-2" />
          )}
          {data.isStacked && data.cards && (
            <div
              className={cn(
                "grid items-stretch justify-center gap-8",
                cardSet?.length === 2 && "sm:grid-cols-2",
                cardSet?.length === 3 && "sm:grid-cols-2 md:grid-cols-3",
                cardSet?.length >= 4 && "sm:grid-cols-2 lg:grid-cols-4"
              )}
            >
              {cardSet?.map((cardData, index) => {
                return (
                  <V3Card
                    className="w-full"
                    key={`v3-card-${index}`}
                    placeholder={hasImages}
                    data={cardData}
                  />
                );
              })}
            </div>
          )}
        </div>
        {data.cards && !data.isStacked && (
          <Container size="custom" padding="sm:pt-8" className="pt-4">
            <V3CardList cards={cardSet} hasImages={hasImages} />
          </Container>
        )}
      </Container>
    </V2ComponentWrapper>
  );
}
