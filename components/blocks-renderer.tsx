import dynamic from "next/dynamic";

import { AboutUs } from "./blocks/aboutUs";
import { Agenda } from "./blocks/agenda";
import { BuiltOnAzure } from "./blocks/builtOnAzure";
import { Carousel } from "./blocks/carousel";
import { ClientLogos } from "./blocks/clientLogos";
import { Content } from "./blocks/content";
import { ContentCard } from "./blocks/contentCard";
import { CustomImage } from "./blocks/customImage";
import { FixedColumns } from "./blocks/fixedColumns";
import { HorizontalCard } from "./blocks/horizontalCard";
import { JotFormEmbed } from "./blocks/jotFormEmbed";
import { ServiceCards } from "./blocks/serviceCards";
import { TableLayout } from "./blocks/tableLayout";
import { UpcomingEvents } from "./blocks/upcomingEvents";
import { VerticalImageLayout } from "./blocks/verticalImageLayout";
import { VerticalListItem } from "./blocks/verticalListItem";
import { VideoEmbed } from "./blocks/videoEmbed";

const BookingButton = dynamic(() =>
  import("./bookingButton/bookingButton").then((mod) => mod.BookingButton)
);

const ClientList = dynamic(() =>
  import("./company/clientList").then((mod) => mod.ClientList)
);

const ColorBlock = dynamic(() =>
  import("./blocks/colorBlock").then((mod) => mod.ColorBlock)
);

const DownloadBlock = dynamic(() =>
  import("./blocks/downloadBlock").then((mod) => mod.DownloadBlock)
);

const GridLayout = dynamic(() =>
  import("./blocks/gridLayout").then((mod) => mod.GridLayout)
);

const LatestTech = dynamic(() =>
  import("./usergroup/latestTech").then((mod) => mod.LatestTech)
);

const PaymentBlock = dynamic(() =>
  import("./blocks/payment-block").then((mod) => mod.PaymentBlock)
);

const EventBooking = dynamic(() =>
  import("./training/eventBooking").then((mod) => mod.EventBooking)
);

const LocationBlock = dynamic(() =>
  import("./training/locationBlock").then((mod) => mod.LocationBlock)
);

const PresenterBlock = dynamic(() =>
  import("./training/presenterBlock").then((mod) => mod.PresenterBlock)
);
const TrainingInformation = dynamic(() =>
  import("./training/trainingInformation").then(
    (mod) => mod.TrainingInformation
  )
);
const TrainingLearningOutcome = dynamic(() =>
  import("./training/trainingLearningOutcome").then(
    (mod) => mod.TrainingLearningOutcome
  )
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
  BookingButton,
  PaymentBlock,
  ClientList,
  LatestTech,
  VideoEmbed,
  JotFormEmbed,
  ColorBlock,
  DownloadBlock,
  GridLayout,
  FixedColumns,
  HorizontalCard,
};

export const Blocks = ({ prefix, blocks }) => {
  return (
    <div>
      {blocks ? (
        blocks.map((block, i) => (
          <Block
            key={i + block.__typename}
            blockData={block}
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

const Block = ({ prefix, blockData, i }) => {
  const Component = componentMap[blockData.__typename?.replace(prefix, "")];

  if (!Component) {
    return <></>;
  }

  const field = `blocks.${i}`;
  const blockProps = { ...blockData, data: blockData, parentField: field };

  return (
    <div className="contents" data-tinafield={field}>
      <Component {...blockProps} />
    </div>
  );
};
