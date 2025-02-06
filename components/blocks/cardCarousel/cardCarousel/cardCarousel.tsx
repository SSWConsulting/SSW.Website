"use client";

import { Button } from "@/components/button/templateButton";
import { Container } from "@/components/util/container";
import Link from "next/link";
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
      <Container>
        <div className="flex flex-col gap-4 text-center">
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
          {data.buttons?.length > 0 && (
            <div className={"mb-4 mt-2 flex justify-center gap-3"}>
              {data.buttons?.map((button, index) => {
                const buttonElement = (
                  <Button
                    className="text-base font-semibold"
                    key={`image-text-button-${index}`}
                    data={button}
                  />
                );

                return button.buttonLink && !button.showLeadCaptureForm ? (
                  <Link href={button.buttonLink} key={`link-wrapper-${index}`}>
                    {buttonElement}
                  </Link>
                ) : (
                  <>{buttonElement}</>
                );
              })}
            </div>
          )}
          {data.isStacked && data.cards && (
            <>
              <div className="flex flex-wrap items-stretch justify-center gap-4 lg:gap-8">
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
          <Container size="custom" padding="sm:px-8" className="py-4">
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
