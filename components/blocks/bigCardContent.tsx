import dynamic from "next/dynamic";
import React, { memo } from "react";
import { tinaField } from "tinacms/dist/react";
import { CustomLink } from "../customLink";
import { serviceCards } from "./serviceCards.schema";

const Image = dynamic(() => import("next/image"));

interface BigCardContentProps {
  card: {
    title: string;
    link?: string;
    imgSrc?: string;
    description: string;
    color: string;
  };
  index: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: any;
  bgColor: { [key: string]: string };
}

const BigCardContent = memo(
  ({ card, index, schema, bgColor }: BigCardContentProps) => {
    return (
      <li
        key={card.title}
        className={`col-span-1 flex flex-col divide-y divide-gray-200 text-center shadow ${bgColor[card.color]} hover:opacity-80`}
      >
        <CustomLink
          href={card.link ?? ""}
          className="unstyled flex grow text-left text-white"
        >
          <div className="flex grow flex-col">
            {card?.imgSrc && (
              <div className="absolute flex-1 self-end">
                <Image
                  className="opacity-50"
                  src={card.imgSrc ?? ""}
                  width={100}
                  height={100}
                  sizes="20vw"
                  alt={`Icon for ${card.title}`}
                  loading="lazy"
                />
              </div>
            )}
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
              <p
                data-tina-field={tinaField(
                  schema.bigCards[index],
                  serviceCards.bigCards.description
                )}
              >
                {card.description}
              </p>
            </div>
          </div>
        </CustomLink>
      </li>
    );
  }
);

BigCardContent.displayName = "BigCardContent";

export default BigCardContent;
