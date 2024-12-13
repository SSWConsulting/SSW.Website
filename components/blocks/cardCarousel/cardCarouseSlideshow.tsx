import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPickItem,
  useCarousel,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Card } from "./cardCarousel";
const CardList = ({ data, hasImages }) => {
  return (
    <div>
      <div className="mask-horizontal-fade">
        <Carousel
          opts={{ align: "center", loop: true, containScroll: false }}
          className="w-full max-w-9xl"
        >
          <CarouselContent>
            {data?.map((cardData, index) => {
              return (
                <CarouselItem
                  className="flex basis-72 md:basis-96"
                  key={`card-carousel-${index}`}
                >
                  <Card placeholder={hasImages} data={{ ...cardData }} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="m-auto flex w-3/4 justify-center gap-2 p-6">
            {data?.map((_, index) => {
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
