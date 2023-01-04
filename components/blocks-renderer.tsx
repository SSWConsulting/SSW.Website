import React from "react";
import type { Page } from "../.tina/__generated__/types";

import { Carousel } from "./blocks/carousel";
import { CenterAlignedContent } from "./blocks/centerAlignedContent";
import { Content } from "./blocks/content";
import { ServiceCards } from "./blocks/serviceCards";

const componentMap = {
  PageBlocksCarousel: Carousel,
  PageBlocksCenterAlignedContent: CenterAlignedContent,
  PageBlocksContent: Content,
  PageBlocksServiceCards: ServiceCards,
};

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks ? props.blocks.map(renderBlock) : null}
    </>
  );
};

const renderBlock = (
  block: import("d:/src/SSW.Website/.tina/__generated__/types").PageBlocks,
  i: number
): JSX.Element => {
  const component = componentMap[block.__typename];

  if (!component) {
    return null;
  }

  const field = `blocks.${i}`;
  const blockProps = { data: block, parentField: field };

  return (
    <div
      data-tinafield={field}
      key={i + block.__typename}
    >
      {React.createElement(component, { ...blockProps })}
    </div>
  );
}