import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { Container } from "../util/container";
import { Section } from "../util/section";

const bgColor = {
  "red": "bg-sswRed",
  "lightgray": "bg-[#9e9e9e]",
  "mediumgray": "bg-[#666666]",
  "darkgray": "bg-[#414141]",
};

export const ServiceCards = ({ data }) => {
  return (
    <Section color={data.backgroundColor}>
      <Container size="custom">
        <div className="py-4">
          <BigCards title={data.bigCardsLabel} cards={data.bigCards} />
        </div>
          
        <div className="py-4">
          <SmallCards title={data.smallCardsLabel} cards={data.smallCards} />
        </div>
          
        <Links links={data.links} />
      </Container>
    </Section>
  );
};

const Label = ({ text }) => {
  return (
    <div className={`absolute text-left text-xs font-normal uppercase text-white ${bgColor["darkgray"]} z-10 w-fit p-2`}>
      {text}
    </div>
  )
};

const BigCards = ({ title, cards }) => {
  return <>
    <Label text={title} />
    <ul
      role="list"
      className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
    >
      {cards.map((card) => (
        <li
          key={card.title}
          className={`col-span-1 flex flex-col divide-y divide-gray-200 text-center shadow ${bgColor[card.color]} hover:opacity-80`}
        >
          <Link href={card.link} className="unstyled flex grow text-left text-white">

            <div className="flex grow flex-col">
              <div
                className="absolute flex-1 self-end"
                >
                <Image 
                    src={card.imgSrc} 
                    width="100"
                    height="100"
                    objectFit="contain"
                    objectPosition="10px 0px"
                    alt=""/>
              </div>
              <div className="relative flex grow flex-col p-8">
                <h3 className="flex pb-3 text-2xl font-light lg:pt-8">
                  {card.title}
                </h3>
                <div className="grow"></div>
                <TinaMarkdown content={card.description} />
              </div>
            </div>

          </Link>
        </li>
      ))}
    </ul>
  </>;
};

const SmallCards = ({ title, cards }) => {
  return <>
    <Label text={title} />
    <ul
      role="list"
      className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4"
    >
      {cards.map((card) => (
        <li
          key={card.title}
          className={`col-span-1 flex flex-col divide-y divide-gray-200 text-center shadow ${bgColor[card.color]} hover:opacity-80`}
        >
          <Link href={card.link} className="flex h-full flex-col">

            <div className="flex flex-1 flex-col justify-center py-8 px-2 pb-4 sm:justify-center md:flex-row md:pb-8">
              <Image 
                  className=""
                  src={card.imgSrc} 
                  width="50"
                  height="50"
                  objectFit="contain"
                  alt=""/>
              <h3 className="mt-1 text-sm font-light text-white md:m-5 ">
                {card.title}
              </h3>
            </div>

          </Link>
        </li>
      ))}
    </ul>
  </>;
};

const Links = ({ links }) => {
  return (
    <div className="flex flex-wrap items-center justify-between gap-6 py-3">
      {links.map((card, i) => (
        (<Link
          key={i}
          href={card.link ?? ""}
          className="inline-flex items-center border-2 border-gray-300 bg-white px-3 py-2 text-xs font-normal leading-4 text-black shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2">

          {card.label}

        </Link>)
      ))}
    </div>
  );
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
      name: "bigCardsLabel",
    },
    {
      label: "Big Cards",
      name: "bigCards",
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
          name: "title",
        },
        {
          type: "rich-text",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          label: "URL",
          name: "link",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
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
          name: "imgSrc",
        },
      ],
    },
    {
      type: "string",
      label: "Small Cards Label",
      name: "smallCardsLabel",
    },
    {
      label: "Small Cards",
      name: "smallCards",
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
          name: "title",
        },
        {
          type: "string",
          label: "URL",
          name: "link",
        },
        {
          type: "string",
          label: "Color",
          name: "color",
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
          name: "imgSrc",
        },
      ],
    },
    {
      label: "Links",
      name: "links",
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
          name: "label",
        },
        {
          type: "string",
          label: "URL",
          name: "link",
        },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
