import dynamic from "next/dynamic";

import { AboutUs } from "./blocks/aboutUs";
import { Agenda } from "./blocks/agenda";
import { BuiltOnAzure } from "./blocks/builtOnAzure";
import { ClientLogos } from "./blocks/clientLogos";
import { Content } from "./blocks/content";
import { ContentCard } from "./blocks/contentCard";
import { CustomImage } from "./blocks/customImage";
import { PaymentBlock } from "./blocks/payment-block";
import { ServiceCards } from "./blocks/serviceCards";
import { TableLayout } from "./blocks/tableLayout";
import { UpcomingEvents } from "./blocks/upcomingEvents";
import { VerticalImageLayout } from "./blocks/verticalImageLayout";
import { VerticalListItem } from "./blocks/verticalListItem";
import { EventBooking } from "./training/eventBooking";
import { LocationBlock } from "./training/locationBlock";
import { PresenterBlock } from "./training/presenterBlock";
import { TrainingInformation } from "./training/trainingInformation";
import { TrainingLearningOutcome } from "./training/trainingLearningOutcome";
import { JoinAsPresenter } from "./usergroup/joinAsPresenter";
import { JoinGithub } from "./usergroup/joinGithub";
import { Organizer } from "./usergroup/organizer";

const Carousel = dynamic(
  () => import("./blocks/carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);

const BookingButton = dynamic(
  () =>
    import("./bookingButton/bookingButton").then((mod) => mod.BookingButton),
  { ssr: false }
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
  TableLayout,
  Agenda,
  Organizer,
  JoinGithub,
  JoinAsPresenter,
  BookingButton,
  PaymentBlock,
};

export const Blocks = ({ prefix, blocks }) => {
  return (
    <div>
      {blocks ? (
        blocks.map((block, i) => (
          <Block
            key={i + block.__typename}
            block={block}
            prefix={prefix}
            i={i}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

const Block = ({ prefix, block, i }) => {
  const Component = componentMap[block.__typename?.replace(prefix, "")];

  if (!Component) {
    return <></>;
  }

  const field = `blocks.${i}`;
  const blockProps = { data: block, parentField: field };

  return (
    <div className="contents" data-tinafield={field}>
      <Component {...blockProps} />
    </div>
  );
};
