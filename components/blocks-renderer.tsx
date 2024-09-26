import dynamic from "next/dynamic";

const BookingButton = dynamic(() =>
  import("./bookingButton/bookingButton").then((mod) => mod.BookingButton)
);

const UpcomingEvents = dynamic(() =>
  import("./blocks/upcomingEvents").then((mod) => mod.UpcomingEvents)
);

const AboutUs = dynamic(() =>
  import("./blocks/aboutUs").then((mod) => mod.AboutUs)
);

const Agenda = dynamic(() =>
  import("./blocks/agenda").then((mod) => mod.Agenda)
);

const BuiltOnAzure = dynamic(() =>
  import("./blocks/builtOnAzure").then((mod) => mod.BuiltOnAzure)
);

import { Carousel } from "./blocks/carousel";
const ClientLogos = dynamic(() =>
  import("./blocks/clientLogos").then((mod) => mod.ClientLogos)
);

const Content = dynamic(() =>
  import("./blocks/content").then((mod) => mod.Content)
);

const ContentCard = dynamic(() =>
  import("./blocks/contentCard").then((mod) => mod.ContentCard)
);

const CustomImage = dynamic(() =>
  import("./blocks/customImage").then((mod) => mod.CustomImage)
);

const FixedColumns = dynamic(() =>
  import("./blocks/fixedColumns").then((mod) => mod.FixedColumns)
);

const HorizontalCard = dynamic(() =>
  import("./blocks/horizontalCard").then((mod) => mod.HorizontalCard)
);

const JotFormEmbed = dynamic(() =>
  import("./blocks/jotFormEmbed").then((mod) => mod.JotFormEmbed)
);

import { ServiceCards } from "./blocks/serviceCards";

const TableLayout = dynamic(() =>
  import("./blocks/tableLayout").then((mod) => mod.TableLayout)
);

const VerticalImageLayout = dynamic(() =>
  import("./blocks/verticalImageLayout").then((mod) => mod.VerticalImageLayout)
);

const VerticalListItem = dynamic(() =>
  import("./blocks/verticalListItem").then((mod) => mod.VerticalListItem)
);

const VideoEmbed = dynamic(() =>
  import("./blocks/videoEmbed").then((mod) => mod.VideoEmbed)
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

const InterestForm = dynamic(() =>
  import("./events/interestForm").then((mod) => mod.InterestForm)
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
  InterestForm,
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
