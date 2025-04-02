import Image from "next/image";
import React, { useMemo } from "react";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";
import { Container } from "../util/container";
import { Section } from "../util/section";
import BigCardContent from "./bigCardContent";
import { serviceCards } from "./serviceCards.schema";

const bgColor = {
  red: "bg-sswRed",
  lightgray: "bg-[#9e9e9e]",
  mediumgray: "bg-[#666666]",
  darkgray: "bg-[#414141]",
};

export const ServiceCards = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container
        size="custom"
        data-tina-field={tinaField(data, serviceCards.bigCardsLabel)}
      >
        <div className="py-4">
          <BigCards
            title={data.bigCardsLabel}
            cards={data.bigCards}
            schema={data}
          />
        </div>

        <div className="py-4">
          <SmallCards
            title={data.smallCardsLabel}
            cards={data.smallCards}
            schema={data}
          />
        </div>

        <Links links={data.links} schema={data} />
      </Container>
    </Section>
  );
};

const Label = ({ text, schema, cardLabel }) => {
  return (
    <div
      className={`absolute text-left text-xs font-normal uppercase text-white ${bgColor["darkgray"]} w-fit p-2 z-badge`}
      data-tina-field={tinaField(schema, cardLabel)}
    >
      {text}
    </div>
  );
};

const BigCards = ({ title, cards, schema }) => {
  const memoizedCards = useMemo(() => cards, [cards]);

  return (
    <>
      <Label
        text={title}
        schema={schema}
        cardLabel={serviceCards.bigCardsLabel}
      />
      <ul
        role="list"
        className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
      >
        {memoizedCards.map((card, index) => (
          <BigCardContent
            key={card.title}
            card={card}
            index={index}
            schema={schema}
            bgColor={bgColor}
          />
        ))}
      </ul>
    </>
  );
};

const SmallCards = ({ title, cards, schema }) => {
  return (
    <>
      <Label
        text={title}
        schema={schema}
        cardLabel={serviceCards.smallCardsLabel}
      />
      <ul
        role="list"
        className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
      >
        {cards.map((card, index) => (
          <li
            key={card.title}
            className={`col-span-1 flex flex-col divide-y divide-gray-200 text-center shadow ${
              bgColor[card.color]
            } hover:opacity-80`}
          >
            <CustomLink
              href={card.link ?? ""}
              className="unstyled flex h-full flex-col"
            >
              <SmallCardContent card={card} schema={schema} index={index} />
            </CustomLink>
          </li>
        ))}
      </ul>
    </>
  );
};

const SmallCardContent = ({ card, schema, index }) => {
  return (
    <div className="flex flex-1 flex-col items-center px-2 py-8 pb-4 sm:justify-center md:flex-row md:pb-8">
      <span
        data-tina-field={tinaField(
          schema.smallCards[index],
          serviceCards.smallCards.imgSrc
        )}
      >
        <Image
          // eslint-disable-next-line tailwindcss/no-arbitrary-value
          className="size-[50px]"
          src={card.imgSrc ?? ""}
          width={50}
          height={50}
          sizes="20vw"
          alt={`Icon for ${card.title}`}
          priority={index < 4}
        />
      </span>
      <h3
        data-tina-field={tinaField(
          schema.smallCards[index],
          serviceCards.smallCards.title
        )}
        className="unstyled mt-1 pt-2 text-sm font-light text-white md:m-5"
      >
        {card.title}
      </h3>
    </div>
  );
};

const Links = ({ links, schema }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 py-3">
      {links.map((card, i) => (
        <CustomLink
          key={i}
          href={card.link ?? ""}
          className="unstyled inline-flex items-center rounded border-1 border-gray-300 bg-white px-3 py-2 text-xs font-normal leading-4 text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2"
          data-tina-field={tinaField(schema.links[i], serviceCards.links.label)}
        >
          {card.label}
        </CustomLink>
      ))}
    </div>
  );
};
