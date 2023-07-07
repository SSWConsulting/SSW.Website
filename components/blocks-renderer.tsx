import React from "react";
import { AboutUs } from "./blocks/aboutUs";

import { BuiltOnAzure } from "./blocks/builtOnAzure";
import { Carousel } from "./blocks/carousel";
import { ClientLogos } from "./blocks/clientLogos";
import { Content } from "./blocks/content";
import { ContentCard } from "./blocks/contentCard";
import { CustomImage } from "./blocks/customImage";
import { ServiceCards } from "./blocks/serviceCards";
import { TableLayout } from "./blocks/tableLayout";
import { UpcomingEvents } from "./blocks/upcomingEvents";
import { VerticalImageLayout } from "./blocks/verticalImageLayout";
import { VerticalListItem } from "./blocks/verticalListItem";
import { EventBooking } from "./training/eventBooking";
import { PresenterBlock } from "./training/presenterBlock";
import { TrainingInformation } from "./training/trainingInformation";
import { TrainingLearningOutcome } from "./training/trainingLearningOutcome";

const componentMap = {
  AboutUs: AboutUs,
  Carousel: Carousel,
  Content: Content,
  ServiceCards: ServiceCards,
  UpcomingEvents: UpcomingEvents,
  BuiltOnAzure: BuiltOnAzure,
  CustomImage: CustomImage,
  ClientLogos: ClientLogos,
  VerticalImageLayout: VerticalImageLayout,
  ContentCard: ContentCard,
  VerticalListItem: VerticalListItem,
  TrainingInformation: TrainingInformation,
  EventBooking: EventBooking,
  TrainingLearningOutcome: TrainingLearningOutcome,
  PresenterBlock: PresenterBlock,
  TableLayout: TableLayout,
};

export const Blocks = ({ prefix, blocks }) => {
  return (
    <div>
      {blocks ? blocks.map((block, i) => renderBlock(prefix, block, i)) : null}
    </div>
  );
};

const renderBlock = (prefix, block, i): JSX.Element => {
  const component = componentMap[block.__typename?.replace(prefix, "")];

  if (!component) {
    return null;
  }

  const field = `blocks.${i}`;
  const blockProps = { data: block, parentField: field };

  return (
    <div className="contents" data-tinafield={field} key={i + block.__typename}>
      {React.createElement(component, { ...blockProps })}
    </div>
  );
};
