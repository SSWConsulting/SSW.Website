import React from "react";
import { AboutUs } from "./blocks/aboutUs";

import { Carousel } from "./blocks/carousel";
import { Content } from "./blocks/content";
import { ServiceCards } from "./blocks/serviceCards";
import { UpcomingEvents } from "./blocks/upcomingEvents";
import { BuiltOnAzure } from "./blocks/builtOnAzure";
import { CustomImage } from "./blocks/customImage";
import { ClientLogos } from "./blocks/clientLogos";
import { ColumnLayout } from "./blocks/columnLayout";
import { VerticalListItem } from "./blocks/verticalListItem";
import { TrainingInformation } from "./training/trainingInformation";
import { TrainingLearningOutcome } from "./training/trainingLearningOutcome";

const componentMap = {
  "AboutUs": AboutUs,
  "Carousel": Carousel,
  "Content": Content,
  "ServiceCards": ServiceCards,
  "UpcomingEvents": UpcomingEvents,
  "BuiltOnAzure": BuiltOnAzure,
  "CustomImage": CustomImage,
  "ClientLogos": ClientLogos,
  "ColumnLayout":  ColumnLayout,
  "VerticalListItem":  VerticalListItem,
  "TrainingInformation":  TrainingInformation,
  "TrainingLearningOutcome": TrainingLearningOutcome
};

export const Blocks = ({ prefix, blocks}) => {
  return (
    <>
      {blocks ? blocks.map((block, i) => renderBlock(prefix, block, i)) : null}
    </>
  );
};

const renderBlock = (
  prefix,
  block,
  i,
): JSX.Element => {
  // As per the Tina schema, the prefix should match the component property name, however,
  // if this does not work (e.g. _body), a simple console.log(block) should tell you what it is
  const component = componentMap[block.__typename?.replace(prefix, "")];

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
