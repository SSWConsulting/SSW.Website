import { Carousel, CarouselContent, CarouselItem, CarouselPickItem } from "@/components/ui/carousel";
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
    }, [activeCategory]);
    const [activeCardIndex, setActiveCardIndex] = useState(0);
    useEffect(() => {
      console.log(data);
      setCardData(data.cards);
    }, [data]);
  
    return <div>
      <div className="mask-horizontal-fade flex items-stretch justify-center gap-4">
    <Carousel opts={{ align: "center", loop: true}} className="w-full max-w-9xl">
          <CarouselContent>
            {cardData.map((cardData, index) => {
              return (
                <CarouselItem
                  className="flex basis-96"
                  key={`card-carousel-${index}`}
                >
                  <Card placeholder={hasImages} data={{...cardData, cardStyle: data.cardStyle}} />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex gap-4 m-auto w-3/4 justify-center p-6 ">
            {cardData.map((_, index) => { 
              return <CarouselPickItem onClick={()=>{
                setActiveCardIndex(index);
              }} className={`h-1 max-w-8 rounded-full w-full ${activeCardIndex === index ? "bg-gray-300" : "bg-gray-500"}`} index={index}/>
            })}
          </div>
        </Carousel>
        </div>

</div>
  };


  export { CardList };

