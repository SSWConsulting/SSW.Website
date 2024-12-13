"use client";
import { ListItem } from "@/components/blocksSubtemplates/listItem";
import { PillGroup } from "@/components/blocksSubtemplates/pillGroup";
import { Button } from "@/components/button/templateButton";
import { Container } from "@/components/util/container";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { cardOptions } from "../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { Icon } from "../../blocksSubtemplates/tinaFormElements/icon";
import V2ComponentWrapper from "../../layout/v2ComponentWrapper";
import { CardList } from "./cardCarouseSlideshow";

export const CardCarousel = ({ data }) => {
  //Check if any images are used in cards (adds a placeholder to the other cards)
  const [hasImages, setHasImages] = useState(false);
  const [cardSet, setCardSet] = useState(data.cards);

  useEffect(() => {
    setHasImages(data.cards?.some((card) => card.image));
    setCardSet(data.cards);
  }, [data.cards]);

  //Sliding tabs
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedTabWidth, setSelectedTabWidth] = useState(0);
  const [selectedTabOffset, setSelectedTabOffset] = useState(0);

  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    if (activeCategory === null) {
      return;
    }

    const currentTab = buttonRefs.current[
      data.categoryGroup?.indexOf(activeCategory)
    ] as HTMLElement;
    setSelectedTabOffset(currentTab?.offsetLeft ?? 0);
    setSelectedTabWidth(currentTab?.clientWidth ?? 0);
  }, [activeCategory, data.categoryGroup]);

  return (
    <V2ComponentWrapper data={data}>
      <Container>
        <div className="flex flex-col gap-4 text-center">
          <div className="relative m-auto flex w-fit overflow-hidden rounded-md bg-black">
            {/* Underlay to achieve the slide effect */}
            <span
              className="absolute inset-y-0 flex overflow-hidden rounded-md transition-all duration-500"
              style={{ left: selectedTabOffset, width: selectedTabWidth }}
            >
              <span className="size-full bg-white" />
            </span>
            {/* Actual buttons */}
            {data.categoryGroup?.map((category, index) => {
              return (
                <>
                  <button
                    data-tina-field={tinaField(category, "categoryName")}
                    ref={(el) => {
                      buttonRefs.current[index] = el;
                    }}
                    key={`category-${index}`}
                    className={`relative w-fit min-w-24 rounded-md bg-transparent p-2 transition-colors duration-500 ${
                      activeCategory === category
                        ? "text-black"
                        : "text-gray-200"
                    }`}
                    onClick={() => {
                      setActiveCategory(category);
                      setCardSet(
                        data.cards?.filter((card) => {
                          return category.cardGuidList?.cardGuidList?.includes(
                            card.guid
                          );
                        })
                      );
                    }}
                  >
                    {category.categoryName}
                  </button>
                </>
              );
            })}
          </div>
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
            <div
              className={`mb-4 mt-2 flex gap-3 ${data.mediaConfiguration?.imageSource ? "" : "justify-center"}`}
            >
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
            data={cardSet?.map((cardData) => {
              return { ...cardData, cardStyle: data.cardStyle };
            })}
            hasImages={hasImages}
          />
        </Container>
      )}
    </V2ComponentWrapper>
  );
};

const Card = ({ data, placeholder }) => {
  //If image fails to load, use placeholder (Piers)
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const placeholderImage = "/images/videoPlaceholder.png";

  return (
    <div
      className={`w-90 flex shrink flex-col rounded-md text-start ${
        cardOptions.find((value) => {
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
