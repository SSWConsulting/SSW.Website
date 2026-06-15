"use client";

import AlternatingText from "@/components/alternating-text";
import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { IconLabel } from "../../../blocksSubtemplates/iconLabel";
import V2ComponentWrapper from "../../../layout/v2ComponentWrapper";
import { Card } from "../layout/card";
import { CardList } from "../layout/cardCarouseSlideshow";
import { Tabs, useTabCarousel } from "../layout/cardCarouselTabs";

export const CardCarousel = ({ data }) => {
  //Check if any images are used in cards (adds a placeholder to the other cards)
  const tabletTextLeft = data.tabletTextAlignment === "Left";
  const [hasImages, setHasImages] = useState(false);
  const { tabsData, activeCategory, categoryGroup } = useTabCarousel({
    categoryGroup: data.categoryGroup,
  });
  const [cardSet, setCardSet] = useState(data.cards);

  // Columns for stacked (non-carousel) mode. The editor's "Cards per row"
  // choice takes precedence; when unset, fall back to the original
  // card-count behaviour. Tailwind classes are kept as full static strings
  // so the JIT compiler picks them up.
  const cardsPerRow = data.cardsPerRow
    ? Number(data.cardsPerRow)
    : data.cards?.length === 3
      ? 3
      : data.cards?.length === 2
        ? 2
        : 1;
  const stackedGridColsClass =
    cardsPerRow === 3
      ? "sm:grid-cols-2 md:grid-cols-3 lg:gap-8"
      : cardsPerRow === 2
        ? "sm:grid-cols-2"
        : "";

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
      <Container size="custom" className="py-8 sm:py-12" padding="px-4 sm:px-8">
        <div className="flex flex-col gap-4">
          {data.categoryGroup && (
            <Tabs tabsData={tabsData} categoryGroup={categoryGroup} />
          )}
          <section
            className={cn(
              tabletTextLeft ? "text-left md:text-center" : "text-center"
            )}
          >
            {data.topLabel &&
              (data.topLabel?.icon || data.topLabel?.labelText) && (
                <div
                  className={cn(
                    "flex",
                    tabletTextLeft ? "md:justify-center" : "justify-center"
                  )}
                >
                  <IconLabel data={data.topLabel} />
                </div>
              )}
            {data.isH1 ? (
              <h1
                data-tina-field={tinaField(data, "heading")}
                className="my-0 py-2 text-3xl font-bold lg:text-4xl dark:text-gray-200"
              >
                <AlternatingText text={data.heading} />
              </h1>
            ) : (
              <h2
                data-tina-field={tinaField(data, "heading")}
                className="my-0 py-2 text-2xl font-semibold lg:text-3xl dark:text-gray-200"
              >
                <AlternatingText text={data.heading} />
              </h2>
            )}
            {data.body && (
              <p
                className={cn(
                  tabletTextLeft || "mx-auto",
                  "max-w-4xl py-2 text-base font-light md:mx-auto dark:text-gray-300"
                )}
                data-tina-field={tinaField(data, "body")}
              >
                {data.body}
              </p>
            )}
          </section>
          <ButtonRow
            data={data}
            className={cn("mb-4 mt-2", tabletTextLeft || "justify-center")}
          />
          {data.isStacked && data.cards && (
            <>
              <div
                className={cn(
                  data.cardStyle === 1 ? "gap-8" : "gap-4",
                  // "Cards per row" control wins when set; otherwise fall back
                  // to the original card-count behaviour so existing carousels
                  // render exactly as before.
                  stackedGridColsClass,
                  "grid items-stretch justify-center"
                )}
              >
                {cardSet?.map((cardData, index) => {
                  return (
                    <Card
                      className="w-full"
                      key={`card-${index}`}
                      placeholder={hasImages}
                      data={{ ...cardData, cardStyle: data.cardStyle ?? 0 }}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        {data.cards && !data.isStacked && (
          <Container size="custom" padding="sm:pt-8" className="pt-4">
            <CardList
              activeCategory={activeCategory}
              data={{ cards: cardSet, cardStyle: data.cardStyle ?? 0 }}
              hasImages={hasImages}
            />
          </Container>
        )}
      </Container>
    </V2ComponentWrapper>
  );
};
