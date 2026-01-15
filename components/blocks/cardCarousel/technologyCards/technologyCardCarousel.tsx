"use client";

import { useEffect, useState } from "react";
import { CardCarousel } from "../cardCarousel/cardCarousel";

import { Consultingv2BlocksTechnologyCardCarousel as TechnologyCarouselData } from "@/tina/types";

type TechnologyCardCarouselProps = {
  data: TechnologyCarouselData;
};
export const TechnologyCardCarousel = ({
  data,
}: TechnologyCardCarouselProps) => {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    function fetchData() {
      const cards =
        data.technologies?.map((tech) => {
          return {
            guid: tech.technology.associatedGroup?.name,
            image: tech.technology.thumbnail,
            heading: tech.technology?.name,
            altText: tech.technology?.name,
            description: tech.technology.body,
            embeddedButton: {
              buttonText: "Read More",
              buttonLink: tech.technology.readMoreSlug,
              icon: "BiChevronRight",
            },
            icon: tech.technology.icon,
            contain: true,
          };
        }) ?? [];

      setCardList(cards);
    }
    fetchData();
  }, [data]);

  //This data is a limited version of the data that is passed to the CardCarousel component via its schema
  const cardCarouselData = {
    isStacked: data.isStacked,
    cardStyle: data.techCardStyle,
    cards: cardList,
    isH1: false,
    heading: "Related Technologies",
    body: "",
    background: data.background,
  };

  return <CardCarousel data={cardCarouselData} />;
};
