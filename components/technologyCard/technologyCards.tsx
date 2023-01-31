import { VFC, useEffect, useState } from "react";
import TechnologyCard from "./technologyCard";
import { TechnologyCardsProps } from "./technologyCardTypes";

const TechnologyCards: VFC<TechnologyCardsProps> = ({
  techHeader,
  techCards,
}) => {
  const [techComponents, setTechComponents] = useState([]);
  const getComponent = (name: string, index: number) => {
    const technologyCardNode = techCards.find((c) => c.name == name);
    if (technologyCardNode) {
      return (
        <TechnologyCard
          {...technologyCardNode}
          index={index}
          techListLength={techCards.length}
          key={index}
        />
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    techCards.map((card, index) => {
      setTechComponents((techComponents: Element[]) => [
        ...techComponents,
        getComponent(card.name, index),
      ]);
    });
  }, []);

  return (
    <article className="bg-white px-40 text-black">
       <h1 className="mt-0">{techHeader}</h1>
      <div className="grid grid-cols-12">{techComponents}</div>
    </article>
  );
};

export default TechnologyCards;
