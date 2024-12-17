import { Consultingv2BlocksTechnologyCardCarousel } from "@/tina/types";
import { CardCarousel, CardCarouselData } from "./cardCarousel";

const TechnologyCardCarousel = (
  props: Consultingv2BlocksTechnologyCardCarousel
) => {
  const cards: CardCarouselData["cards"] = props.technologyCards.map((card) => {
    //todo: add readmore text here
    const { readMoreSlug, thumbnail, icon, name } = card.technologyCard;
    return {
      __typename: props.__typename,
      title: name,
      image: thumbnail,
      icon: icon,
      embeddedButton: {
        buttonText: "Read More",
        buttonLink: readMoreSlug,
      },
    };
  });

  const data = {
    isStacked: props.isStacked,
    background: props.background,
    cards: cards,
  };
  return <CardCarousel data={data} />;
};

export default TechnologyCardCarousel;
