import client from "@/tina/client";
import { useEffect, useState } from "react";
import { CardCarousel } from "../cardCarousel/cardCarousel";

export const TechnologyCardCarousel = ({ data }) => {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await client.queries.technologiesv2Connection({
        filter: {
          associatedGroup: {
            technologyGroupsv2: {
              name: {
                in: data.technologyGroups?.map(
                  (group) => group.technologyGroup?.name
                ),
              },
            },
          },
        },
      });
      const cards = response.data.technologiesv2Connection.edges.map((card) => {
        return {
          guid: card.node.associatedGroup?.name,
          image: card.node.thumbnail,
          title: card.node.name,
          altText: card.node.name,
          description: card.node.body,
          embeddedButton: {
            buttonText: "Read More",
            buttonLink: card.node.readMoreSlug,
            buttonIcon: "arrow-right",
          },
          icon: card.node.icon,
        };
      });
      setCardList(cards);
    }
    fetchData();
  }, [data]);

  //This data is a limited version of the data that is passed to the CardCarousel component via its schema
  const cardCarouselData = {
    isStacked: data.isStacked,
    categoryGroup: data.technologyGroups?.map((group) => {
      return {
        categoryName: group.technologyGroup?.name,
        cardGuidList: {
          guid: group.technologyGroup?.name,
          cardGuidList: [group.technologyGroup?.name],
        },
      };
    }),
    cardStyle: 1,
    cards: cardList,
    isH1: false,
    heading: "Related Technologies",
    body: "",
  };

  return <CardCarousel data={cardCarouselData} />;
};
