import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPickItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Card } from "./cardCarousel";
const CardList = ({ activeCategory, data, hasImages }) => {
  const [cardData, setCardData] = useState(data.cards);
  useEffect(() => {
    if (activeCategory)
      setCardData(
        data.cards.filter((card) => {
          return activeCategory?.cardGuidList.cardGuidList.includes(card.guid);
        })
      );
  }, [activeCategory, data.cards]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  useEffect(() => {
    setCardData(data.cards);
  }, [data]);

  return (
    <div>
      <div className="mask-horizontal-fade">
        <Carousel
          opts={{ align: "center", loop: true, containScroll: false }}
          className="w-full max-w-9xl"
        >
          <CarouselContent>
            {cardData.map((cardData, index) => {
              return (
                <CarouselItem
                  className="flex basis-96"
                  key={`card-carousel-${index}`}
                >
                  <Card
                    placeholder={hasImages}
                    data={{ ...cardData, cardStyle: data.cardStyle }}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="m-auto flex w-3/4 justify-center gap-4 p-6">
            {cardData.map((_, index) => {
              return (
                <CarouselPickItem
                  key={`card-carousel-pick-${index}`}
                  onClick={() => {
                    setActiveCardIndex(index);
                  }}
                  className={`h-1 w-full max-w-8 rounded-full ${activeCardIndex === index ? "bg-gray-300" : "bg-gray-500"}`}
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

export { CardList };

