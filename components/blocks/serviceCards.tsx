import Image from "next/image";
import { tinaField } from "tinacms/dist/react";

import type { Template } from "tinacms";

import { CustomLink } from "../customLink";
import { Container } from "../util/container";
import { Section } from "../util/section";

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
        {cards.map((card, index) => (
          <li
            key={card.title}
            className={`col-span-1 flex flex-col divide-y divide-gray-200 text-center shadow ${
              bgColor[card.color]
            } hover:opacity-80`}
          >
            <CustomLink
              href={card.link ?? ""}
              className="unstyled flex grow text-left text-white"
            >
              <div className="flex grow flex-col">
                <div className="absolute flex-1 self-end">
                  <Image
                    className="opacity-50"
                    src={card.imgSrc ?? ""}
                    width="100"
                    height="100"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    alt={`Icon for ${card.title}`}
                  />
                </div>
                <div className="relative flex grow flex-col p-8">
                  <h3
                    className="flex pb-3 text-2xl font-thin lg:pt-8"
                    data-tina-field={tinaField(
                      schema.bigCards[index],
                      serviceCards.bigCards.title
                    )}
                  >
                    {card.title}
                  </h3>
                  <div className="grow"></div>
                  <span
                    data-tina-field={tinaField(
                      schema.bigCards[index],
                      serviceCards.bigCards.description
                    )}
                  >
                    <p>{card.description}</p>
                  </span>
                </div>
              </div>
            </CustomLink>
          </li>
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
          className=""
          src={card.imgSrc ?? ""}
          width="50"
          height="50"
          sizes="(max-width: 768px) 50vw, 33vw"
          alt={`Icon for ${card.title}`}
        />{" "}
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

export const serviceCards = {
  bigCardsLabel: "bigCardsLabel",
  bigCards: {
    value: "bigCards",
    title: "title",
    description: "description",
    color: "color",
    link: "link",
    imgSrc: "imgSrc",
  },
  smallCardsLabel: "smallCardsLabel",
  smallCards: {
    value: "smallCards",
    title: "title",
    link: "link",
    color: "color",
    imgSrc: "imgSrc",
    isExternal: "isExternal",
  },
  links: {
    value: "links",
    label: "label",
    link: "link",
  },
  backgroundColor: "backgroundColor",
};

export const serviceCardsBlockSchema: Template = {
  name: "ServiceCards",
  label: "Service Cards",
  ui: {
    previewSrc: "/blocks/hero.png",
  },
  fields: [
    {
      type: "string",
      label: "Big Cards Label",
      name: serviceCards.bigCardsLabel,
    },
    {
      label: "Big Cards",
      name: serviceCards.bigCards.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.title }),
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: serviceCards.bigCards.title,
        },
        {
          type: "string",
          label: "Description",
          // @ts-expect-error weird tina error
          component: "textarea",
          name: serviceCards.bigCards.description,
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.bigCards.link,
        },
        {
          type: "string",
          label: "Color",
          name: serviceCards.bigCards.color,
          options: [
            { label: "Red", value: "red" },
            { label: "Light Gray", value: "lightgray" },
            { label: "Medium Gray", value: "mediumgray" },
            { label: "Dark Gray", value: "darkgray" },
          ],
        },
        {
          type: "image",
          label: "Image",
          name: serviceCards.bigCards.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "service-cards",
        },
      ],
    },
    {
      type: "string",
      label: "Small Cards Label",
      name: serviceCards.smallCardsLabel,
    },
    {
      label: "Small Cards",
      name: serviceCards.smallCards.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.title }),
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: serviceCards.smallCards.title,
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.smallCards.link,
        },
        {
          type: "string",
          label: "Color",
          name: serviceCards.smallCards.color,
          options: [
            { label: "Red", value: "red" },
            { label: "Light Gray", value: "lightgray" },
            { label: "Medium Gray", value: "mediumgray" },
            { label: "Dark Gray", value: "darkgray" },
          ],
        },
        {
          type: "image",
          label: "Image",
          name: serviceCards.smallCards.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "service-cards",
        },
        {
          type: "boolean",
          label: "External Page",
          description:
            "Select this if the link is not part of the website. This includes SSW.Rules, and SSW.People links",
          name: serviceCards.smallCards.isExternal,
        },
      ],
    },
    {
      label: "Links",
      name: serviceCards.links.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: serviceCards.links.label,
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.links.link,
        },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: serviceCards.backgroundColor,
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
