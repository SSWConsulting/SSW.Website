import { FC } from "react";
import TechnologyCard from "./technologyCard";
import { TechnologyCardsProps } from "./technologyCardTypes";

const TechnologyCards: FC<TechnologyCardsProps> = ({
  techHeader,
  techCards,
}) => {
  const isOdd = !!(techCards.length % 2);

  return (
    <article className="bg-white text-black">
      <h1 className="mt-0">{techHeader}</h1>
      <div className="grid grid-cols-12 gap-y-10">
        {techCards.map((card, idx) => {
          const isLast = () => idx == techCards.length - 1;
          return isOdd && isLast() ? (
            <TechnologyCard
              key={card.name}
              className="md:col-span-12"
              {...card}
            />
          ) : (
            <TechnologyCard
              key={card.name}
              className="md:col-span-6"
              {...card}
            />
          );
        })}
      </div>
    </article>
  );
};

export default TechnologyCards;
