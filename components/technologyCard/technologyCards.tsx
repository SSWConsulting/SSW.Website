import { FC } from "react";
import TechnologyCard from "./technologyCard";
import { TechnologyCardsProps } from "./technologyCardTypes";

const TechnologyCards: FC<TechnologyCardsProps> = ({
  techHeader,
  techCards,
}) => {
  return (
    <article className="bg-white text-black">
      <h1 className="mt-0">{techHeader}</h1>
      <div className="grid grid-cols-12 gap-y-10">
        {techCards.map((card) => {
          return <TechnologyCard key={card.name} {...card} />;
        })}
      </div>
    </article>
  );
};

export default TechnologyCards;
