"use client";

import {
  // getTechnologiesByGroup,
  getTechnologiesByNames,
} from "@/services/server/technologies";
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
      // const technologyGroupNames =
      //   data.technologyGroups
      //     ?.map((group) => {
      //       return group.technologyGroup?.name;
      //     })
      //     .filter((name) => name) || [];

      // if (technologyGroupNames.length === 0) {
      //   setCardList([]);
      //   return;
      // }

      const technologyNames =
        data.technologies
          ?.map((tech) => tech.technology?.name)
          .filter((name): name is string => !!name) || [];

      const response = await getTechnologiesByNames(technologyNames);

      // Create a map of technologies by name for easy lookup
      const techMap = new Map(
        response.data.technologiesv2Connection.edges.map((edge) => [
          edge.node.name,
          edge.node,
        ])
      );

      // Reorder cards to match the original technologyNames order
      const testCards = technologyNames
        .map((name) => {
          const tech = techMap.get(name);
          if (!tech) return null;

          return {
            guid: tech.associatedGroup?.name,
            image: tech.thumbnail,
            heading: tech.name,
            altText: tech.name,
            description: tech.body,
            embeddedButton: {
              buttonText: "Read More",
              buttonLink: tech.readMoreSlug,
              icon: "BiChevronRight",
            },
            icon: tech.icon,
            contain: true,
          };
        })
        .filter((card) => card !== null);

      setCardList(testCards);
    }
    fetchData();
  }, [data]);

  //This data is a limited version of the data that is passed to the CardCarousel component via its schema
  const cardCarouselData = {
    isStacked: data.isStacked,
    // categoryGroup:
    //   data.technologyGroups?.length > 1
    //     ? data.technologyGroups?.map((group) => {
    //         return {
    //           categoryName: group.technologyGroup?.name,
    //           cardGuidList: {
    //             guid: group.technologyGroup?.name,
    //             cardGuidList: [group.technologyGroup?.name],
    //           },
    //         };
    //       })
    //     : [],
    cardStyle: data.techCardStyle,
    cards: cardList,
    isH1: false,
    heading: "Related Technologies",
    body: "",
    background: data.background,
  };

  return <CardCarousel data={cardCarouselData} />;
};
