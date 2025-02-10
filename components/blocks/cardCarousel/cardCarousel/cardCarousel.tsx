"use client";

import ButtonRow from "@/components/blocksSubtemplates/buttonRow";
import { Container } from "@/components/util/container";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import V2ComponentWrapper from "../../../layout/v2ComponentWrapper";
import { Card } from "../layout/card";
import { CardList } from "../layout/cardCarouseSlideshow";
import { Tabs, useTabCarousel } from "../layout/cardCarouselTabs";

export const CardCarousel = ({ data }) => {
  //Check if any images are used in cards (adds a placeholder to the other cards)
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
      <Container size="custom" className="py-4 sm:py-12" padding="px-4 sm:px-8">
        <div
          className={cn(
            "flex flex-col gap-4",
            !data.body && "text-center",
            "sm:text-center"
          )}
        >
          <Tabs tabsData={tabsData} categoryGroup={categoryGroup} />
          {data.isH1 ? (
            <h1
              data-tina-field={tinaField(data, "heading")}
              className="my-0 py-2 text-3xl font-bold lg:text-4xl dark:text-gray-200"
            >
              {data.heading}
            </h1>
          ) : (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="my-0 py-2 text-2xl font-semibold lg:text-3xl dark:text-gray-200"
            >
              {data.heading}
            </h2>
          )}
          {data.body && (
            <p
              className="m-auto max-w-4xl py-2 text-base font-light dark:text-gray-300"
              data-tina-field={tinaField(data, "body")}
            >
              {data.body}
            </p>
          )}
          <ButtonRow data={data} className="mb-4 mt-2 justify-center" />
          {data.isStacked && data.cards && (
            <>
              <div
                className={cn(
                  data.cardStyle === 1 ? "gap-8" : "gap-4",
                  "flex flex-wrap items-stretch justify-center lg:gap-8"
                )}
              >
                {cardSet?.map((cardData, index) => {
                  return (
                    <Card
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
