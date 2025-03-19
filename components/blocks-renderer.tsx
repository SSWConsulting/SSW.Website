import dynamic from "next/dynamic";

const PaymentBlock = dynamic(() =>
  import("./blocks/payment-block").then((mod) => mod.PaymentBlock)
);

const BookingButton = dynamic(() =>
  import("./bookingButton/bookingButton").then((mod) => mod.BookingButton)
);

const UpcomingEvents = dynamic(() =>
  import("./blocks/upcomingEvents").then((mod) => mod.UpcomingEvents)
);

const AboutUs = dynamic(() =>
  import("./blocks/aboutUs").then((mod) => mod.AboutUs)
);

import { Agenda } from "./blocks/agenda";

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

const JotFormEmbed = dynamic(
  () => import("./blocks/jotFormEmbed").then((mod) => mod.JotFormEmbed),
  {
    ssr: false,
  }
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

import { EventBooking } from "./training/eventBooking";

const AccordionBlock = dynamic(() =>
  import("./blocks/imageComponents/accordionBlock/accordionBlock").then(
    (mod) => mod.AccordionBlock
  )
);

const Breadcrumbs = dynamic(() =>
  import("./blocks/breadcrumbs/breadcrumbs").then((mod) => mod.Breadcrumbs)
);

const InterestForm = dynamic(
  () => import("./events/interestForm").then((mod) => mod.InterestForm),
  { ssr: false }
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

const LogoCarousel = dynamic(() =>
  import("./blocks/logoCarousel/logoCarousel").then((mod) => mod.LogoCarousel)
);

const ImageTextBlock = dynamic(() =>
  import("./blocks/imageComponents/imageTextBlock/imageTextBlock").then(
    (mod) => mod.ImageTextBlock
  )
);

const CardCarousel = dynamic(() =>
  import("./blocks/cardCarousel/cardCarousel/cardCarousel").then(
    (mod) => mod.CardCarousel
  )
);

const TechnologyCardCarousel = dynamic(() =>
  import("./blocks/cardCarousel/technologyCards/technologyCardCarousel").then(
    (mod) => mod.TechnologyCardCarousel
  )
);

const Spacer = dynamic(() =>
  import("./blocks/spacer/spacer").then((mod) => mod.Spacer)
);

const componentMap = {
  AboutUs,
  Carousel,
  Content,
  Breadcrumbs,
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
  LogoCarousel,
  ImageTextBlock,
  AccordionBlock,
  CardCarousel,
  TechnologyCardCarousel,
  Spacer,
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
