import Link from "next/link";
import * as React from "react";

import type { Template } from "tinacms";
import { TinaMarkdown } from "tinacms/dist/rich-text";

import { Container } from "../util/container";
import { Section } from "../util/section";

const bgColor = {
  "red": "bg-sswRed",
  "lightgray": "bg-gray-300",
  "mediumgray": "bg-gray-600",
  "darkgray": "bg-gray-700",
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
    <div className="absolute text-sm text-left text-white font-thin uppercase bg-gray-700 w-fit p-2">
      {text}
    </div>
  )
};

const BigCards = ({ title, cards }) => {
  return (
    <>
      <Label text={title} />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5"
      >
        {cards.map((card) => (
          <li
            key={card.title}
            className={`col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow ${bgColor[card.color]}`}
          >
            <Link href={card.link}>
              <a className="unstyled text-white">
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="pt-8 pb-3 text-xl font-medium">
                    {card.title}
                  </h3>
                  <TinaMarkdown content={card.description} />
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const SmallCards = ({ title, cards }) => {
  return (
    <>
      <Label text={title} />
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-5"
      >
        {cards.map((card) => (
          <li
            key={card.title}
            className={`col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg text-center shadow ${bgColor[card.color]}`}
          >
            <Link href={card.link}>
              <a>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="mt-6 text-sm font-medium text-white">
                    {card.title}
                  </h3>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const Links = ({ links }) => {
  return (
    <div className="flex justify-between items-center gap-6 flex-wrap py-3">
      {links.map((card, i) => (
        <Link key={i} href={card.link}>
          <a className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {card.label}
          </a>
        </Link>
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
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
