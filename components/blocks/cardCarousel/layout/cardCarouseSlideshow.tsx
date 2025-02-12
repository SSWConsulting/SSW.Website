import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPickItem,
  useCarousel,
} from "@/components/ui/carousel";
import {
  Consultingv2BlocksCardCarouselCards as CarouselCard,
  Consultingv2BlocksCardCarouselCategoryGroup,
} from "@/tina/types";
import { useEffect, useState } from "react";
import { Card } from "./card";

type CardSlideshowProps = {
  data: {
    cards: CarouselCard[];
    cardStyle: number;
  };
  hasImages: boolean;
  activeCategory: Consultingv2BlocksCardCarouselCategoryGroup;
};

const CardList = ({ activeCategory, data, hasImages }: CardSlideshowProps) => {
  const [cardData, setCardData] = useState(data.cards);
  const [indexLength, setIndexLength] = useState(0);

  useEffect(() => {
    if (
      activeCategory &&
      activeCategory?.cardGuidList?.cardGuidList &&
      data.cards
    ) {
      setCardData(
        data.cards.filter((card) => {
          return activeCategory?.cardGuidList.cardGuidList.includes(card.guid);
        })
      );
    } else {
      setCardData([]);
    }
  }, [activeCategory, data.cards]);
  useEffect(() => {
    setCardData(data.cards);
    setIndexLength(data.cards?.length ?? 0);
  }, [data]);

  return (
    <div>
      <div className="mask-horizontal-fade">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            containScroll: false,
          }}
          className="w-full max-w-9xl"
          itemLength={indexLength}
        >
          <CarouselContent>
            {cardData?.map((cardData, index) => {
              return (
                <CarouselItem
                  className="flex basis-72 md:basis-96"
                  key={`card-carousel-${index}`}
                >
                  <Card
                    className="w-90"
                    placeholder={hasImages}
                    data={{ ...cardData, cardStyle: data.cardStyle }}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="m-auto flex w-3/4 justify-center gap-2 pt-6">
            {cardData?.map((_, index) => {
              return (
                <CarouselButton
                  key={`carousel-button-${index}`}
                  index={index}
                />
              );
            })}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

const CarouselButton = ({ index }) => {
  const { selectedIndex } = useCarousel();
  return (
    <CarouselPickItem
      className={`h-0.5 w-full max-w-8 rounded-full sm:h-1 ${selectedIndex === index ? "bg-gray-300" : "bg-gray-500"}`}
      index={index}
    ></CarouselPickItem>
  );
};

export { CardList };
