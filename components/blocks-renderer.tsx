import dynamic from "next/dynamic";

import { AboutUs } from "./blocks/aboutUs";
import { Agenda } from "./blocks/agenda";
import { BuiltOnAzure } from "./blocks/builtOnAzure";
import { ClientLogos } from "./blocks/clientLogos";
import { Content } from "./blocks/content";
import { ContentCard } from "./blocks/contentCard";
import { CustomImage } from "./blocks/customImage";
import { ServiceCards } from "./blocks/serviceCards";
import { UpcomingEvents } from "./blocks/upcomingEvents";
import { VerticalImageLayout } from "./blocks/verticalImageLayout";
import { VerticalListItem } from "./blocks/verticalListItem";
import { EventBooking } from "./training/eventBooking";
import { LocationBlock } from "./training/locationBlock";
import { PresenterBlock } from "./training/presenterBlock";
import { TrainingInformation } from "./training/trainingInformation";
import { TrainingLearningOutcome } from "./training/trainingLearningOutcome";

const Carousel = dynamic(
  () => import("./blocks/carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);

const componentMap = {
  AboutUs,
  Carousel,
  Content,
  ServiceCards,
  UpcomingEvents,
  BuiltOnAzure,
  CustomImage,
  ClientLogos,
  VerticalImageLayout,
  ContentCard,
  VerticalListItem,
  TrainingInformation,
  EventBooking,
  TrainingLearningOutcome,
  PresenterBlock,
  LocationBlock,
  Agenda: Agenda,
};

export const Blocks = ({ prefix, blocks }) => {
  return (
    <div>
      {blocks ? blocks.map((block, i) => renderBlock(prefix, block, i)) : null}
    </div>
  );
};

const renderBlock = (prefix, block, i): JSX.Element => {
  const Component = componentMap[block.__typename?.replace(prefix, "")];

  if (!Component) {
    return <></>;
  }

  const field = `blocks.${i}`;
  const blockProps = { data: block, parentField: field };

  return (
    <div className="contents" data-tinafield={field} key={i + block.__typename}>
      <Component {...blockProps} />
    </div>
  );
};
