"use client";
import { ListItem } from "@/components/blocksSubtemplates/listItem";
import { PillGroup } from "@/components/blocksSubtemplates/pillGroup";
import { Button } from "@/components/button/templateButton";
import { Container } from "@/components/util/container";
import { Consultingv2BlocksCardCarousel as CardCarouselData } from "@/tina/types";

import { Consultingv2BlocksCardCarouselCards as Card } from "@/tina/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { cardOptions } from "../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { Icon } from "../../blocksSubtemplates/tinaFormElements/icon";
import V2ComponentWrapper from "../../layout/v2ComponentWrapper";
import { CardList } from "./cardCarouseSlideshow";
import { Tabs, useTabCarousel } from "./cardCarouselTabs";

export const CardCarousel = ({ data }: { data: CardCarouselData }) => {
  //Check if any images are used in cards (adds a placeholder to the other cards)
  const [hasImages, setHasImages] = useState(false);
  const { tabsData, activeCategory, categoryGroup } = useTabCarousel({
    categoryGroup: data.categoryGroup,
  });
  const [cardSet, setCardSet] = useState(data.cards);

  useEffect(() => {
    if (activeCategory) {
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

                return button.buttonLink ? (
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
                      data={{ ...cardData, cardStyle: data.cardStyle }}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </Container>
      {data.cards && !data.isStacked && (
        <Container padding="sm:px-8">
          <CardList
            activeCategory={activeCategory}
            data={{ cards: cardSet, cardStyle: data.cardStyle }}
            hasImages={hasImages}
          />
        </Container>
      )}
    </V2ComponentWrapper>
  );
};
type CardProps = {
  data: Card & { cardStyle: number };
  placeholder: boolean;
};
const Card = ({ data, placeholder }: CardProps) => {
  //If image fails to load, use placeholder (Piers)
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const placeholderImage = "/images/videoPlaceholder.png";

  return (
    <div
      className={`flex w-90 shrink flex-col rounded-md text-start ${
        cardOptions.find((value) => {
          console.log("cardRef", value.reference, data.cardStyle);
          return value.reference === data.cardStyle;
        })?.classes
      }`}
    >
      {(data.image || placeholder) && (
        <div
          className="relative mb-2 min-h-36 w-full overflow-hidden rounded-md"
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
            className="object-cover"
          />
        </div>
      )}
      <Icon data={{ name: data.icon }} className="size-6 text-sswRed" />
      {data.chips && <PillGroup data={data.chips} />}
      <h3
        className="pb-2 text-xl font-semibold leading-6 dark:text-gray-200"
        data-tina-field={tinaField(data, "heading")}
      >
        {data.heading}
      </h3>
      {data.description && (
        <p
          className="text-sm font-light dark:text-gray-300"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      )}
      {data.featureList?.features?.map((item, index) => {
        return <ListItem key={index} data={item} />;
      })}
      {data.embeddedButton && (
        <div className="flex h-full flex-col-reverse justify-between">
          <a
            href={data.embeddedButton.buttonLink}
            className="text-md pt-2 font-semibold text-white !decoration-gray-400 !decoration-1 hover:!decoration-sswRed"
          >
            {data.embeddedButton.buttonText}
            <Icon
              data={{ name: data.embeddedButton.icon }}
              className="inline size-4"
            />
          </a>
        </div>
      )}
    </div>
  );
};

export { Card };
