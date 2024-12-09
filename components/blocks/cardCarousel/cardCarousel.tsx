"use client";
import { Button } from "@/components/button/templateButton";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/util/container";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { ListItem } from "../imageComponents/imageTextBlock/listItem";
import { PillGroup } from "../imageComponents/imageTextBlock/pillGroup";
import V2ComponentWrapper from "../imageComponents/imageTextBlock/v2ComponentWrapper";
import { cardOptions } from "../sharedTinaFields/colourOptions/cardOptions";
import { Icon } from "../sharedTinaFields/icon";

export const CardCarousel = ({ data }) => {
  //Check if any images are used in cards (adds a placeholder to the other cards)
  const [hasImages, setHasImages] = useState(false);
  useEffect(() => {
    setHasImages(data.cards?.some((card) => card.image));
  }, [data.cards]);

  //Sliding tabs
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [selectedTabWidth, setSelectedTabWidth] = useState(0);
  const [selectedTabOffset, setSelectedTabOffset] = useState(0);

  const [activeCategory, setActiveCategory] = useState(
    data.categoryGroup?.at(0) ?? null
  );

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
              className="my-0 py-2 text-2xl font-bold lg:text-3xl dark:text-gray-200"
            >
              {data.heading}
            </h2>
          )}
          <p
            className="m-auto max-w-4xl py-2 text-base font-light dark:text-gray-300"
            data-tina-field={tinaField(data, "body")}
          >
            {data.body}
          </p>
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
          {data.isStacked ? (
            <div className="flex flex-wrap items-stretch justify-evenly gap-4">
              {/* {cards} */}
            </div>
          ) : (
            <CarouselLayout cardData={data.cards}>
              <CardList
                activeCategory={activeCategory}
                data={data}
                hasImages={hasImages}
              />
            </CarouselLayout>
          )}
        </div>
      </Container>
    </V2ComponentWrapper>
  );
};

const Card = ({ data, placeholder }) => {
  //If image fails to load, use placeholder (Piers)
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  const placeholderImage = "/images/videoPlaceholder.png";

  return (
    <div
      className={`w-full min-w-64 max-w-sm shrink rounded-md p-4 text-start md:p-6 lg:p-8 ${
        cardOptions.find((value) => {
          return value.reference === data.cardStyle;
        })?.classes
      }`}
    >
      {(data.image || placeholder) && (
        <div
          className="relative mb-2 h-48 w-full overflow-hidden rounded-md"
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
        className="text-lg font-semibold dark:text-gray-200"
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
        <a
          href={data.embeddedButton.buttonLink}
          className="text-sm font-semibold text-white !decoration-white !decoration-2 hover:!decoration-sswRed"
        >
          {data.embeddedButton.buttonText}
          <Icon
            data={{ name: data.embeddedButton.icon }}
            className="inline size-4"
          />
        </a>
      )}
    </div>
  );
};

const CardList = ({ activeCategory, data, hasImages }) => {
  const [cardData, setCardData] = useState(data.cards);

  useEffect(() => {
    console.log("activeCategory", activeCategory);
    if (activeCategory)
      setCardData(
        data.cards.filter((card) => {
          return activeCategory?.cardGuidList.cardGuidList.includes(card.guid);
        })
      );
  }, [activeCategory]);
  return (
    <>
      {cardData.map((card, index) => {
        return (
          <Card
            data={card}
            key={`card-carousel-${index}`}
            placeholder={hasImages}
          />
        );
      })}
    </>
  );
};

//TODO: this layout needs to be completed
const CarouselLayout = ({ children, cardData }) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  return (
    <div>
      <div className="mask-horizontal-fade flex items-stretch justify-center gap-4">
        <Marquee pauseOnHover className="h-full justify-center overflow-hidden">
          {children}
        </Marquee>
      </div>
      <div className="m-auto flex w-3/4 justify-center gap-4 p-6">
        {cardData.map((_, index) => {
          return (
            <button
              key={`card-carousel-button-${index}`}
              className={`h-1 w-full ${activeCardIndex === index ? "bg-gray-300" : "bg-gray-500"}`}
              onClick={() => setActiveCardIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
};
