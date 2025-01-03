import { Consultingv2BlocksCardCarousel } from "@/tina/types";
import { TechnologyCardsProvider } from "./technologyCardProvider";

import TechnologyCardServer from "./technologyCardsServer";
const TechnologyCardCarousel = ({
  data,
}: {
  data: Consultingv2BlocksCardCarousel;
}) => {
  return (
    <TechnologyCardsProvider data={data}>
      <TechnologyCardServer />
    </TechnologyCardsProvider>
  );
};

export { TechnologyCardCarousel };

