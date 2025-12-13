"use client";

import { getTechnologiesByGroup } from "@/services/server/technologies";
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
    async function fetchData() {
      const technologyGroupNames =
        data.technologyGroups
          ?.map((group) => {
            return group.technologyGroup?.name;
          })
          .filter((name) => name) || [];

      if (technologyGroupNames.length === 0) {
        setCardList([]);
        return;
      }

      const response = await getTechnologiesByGroup(technologyGroupNames);
      const cards = response.data.technologiesv2Connection.edges.map((card) => {
        return {
          guid: card.node.associatedGroup?.name,
          image: card.node.thumbnail,
          heading: card.node.name,
          altText: card.node.name,
          description: card.node.body,
          embeddedButton: {
            buttonText: "Read More",
            buttonLink: card.node.readMoreSlug,
            icon: "BiChevronRight",
          },
          icon: card.node.icon,
          contain: true,
        };
      });
      setCardList(cards);
    }
    fetchData();
  }, [data]);

  //This data is a limited version of the data that is passed to the CardCarousel component via its schema
  const cardCarouselData = {
    isStacked: data.isStacked,
    categoryGroup:
      data.technologyGroups?.length > 1
        ? data.technologyGroups?.map((group) => {
            return {
              categoryName: group.technologyGroup?.name,
              cardGuidList: {
                guid: group.technologyGroup?.name,
                cardGuidList: [group.technologyGroup?.name],
              },
            };
          })
        : [],
    cardStyle: data.techCardStyle,
    cards: cardList,
    isH1: false,
    heading: "Related Technologies",
    body: "",
    background: data.background,
  };

  return <CardCarousel data={cardCarouselData} />;
};
