"use client";
import { Card, CardCarousel } from "../cardCarousel/cardCarousel";
import { useTechnologyCardContext } from "./technologyCardProvider";
const TechnologyCardContents = ({ cardMap }) => {
  const data = useTechnologyCardContext();
  if (!cardMap) {
    return <></>;
  }
  if (!data?.technologyGroups) {
    return <></>;
  }
  const cardList: Card[] = data?.technologyGroups.reduce((arr, val) => {
    if (!val.technologyGroup) return arr;
    return [...cardMap[val.technologyGroup?.name || ""], ...arr];
  }, []);
  const cardCarouselData = {
    isStacked: data?.isStacked,
    categoryGroup:
      data?.technologyGroups?.length > 1
        ? data?.technologyGroups?.map((group) => {
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

export default TechnologyCardContents;
