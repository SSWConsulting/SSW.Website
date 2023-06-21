import TechnologyCard from "./technologyCard";
import { TechnologyCardsProps } from "./technologyCardTypes";
import { tinaField } from "tinacms/dist/react";

const TechnologyCards = (props) => {
  const { header, subheading, technologyCards }: TechnologyCardsProps = props;
  const _className =
    technologyCards.length % 2 == 0 ? "" : "last-of-type:col-span-full";

  return (
    <article className="bg-white text-black">
      <h1 data-tina-field={tinaField(props, "header")} className="mt-0">
        {header}
      </h1>
      {subheading && (
        <h4 data-tina-field={tinaField(props, "subheading")}>{subheading}</h4>
      )}
      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
        {technologyCards?.map((card) => {
          const { technologyCard } = card;
          return (
            <TechnologyCard
              key={technologyCard.name}
              className={_className}
              {...technologyCard}
            />
          );
        })}
      </div>
    </article>
  );
};

export default TechnologyCards;
