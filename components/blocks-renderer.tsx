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

const Agenda = dynamic(() =>
  import("./blocks/agenda").then((mod) => mod.Agenda)
);

const UtilityButton = dynamic(() =>
  import("./button/utilityButton").then((mod) => mod.UtilityButton)
);

const Carousel = dynamic(() =>
  import("./blocks/carousel").then((mod) => mod.Carousel)
);

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

const ServiceCards = dynamic(() =>
  import("./blocks/serviceCards").then((mod) => mod.ServiceCards)
);

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

const V3Hero = dynamic(() =>
  import("./blocks/v3/hero/hero").then((mod) => mod.V3Hero)
);

const V3LogoCarousel = dynamic(() =>
  import("./blocks/v3/logoCarousel/logoCarousel").then(
    (mod) => mod.V3LogoCarousel
  )
);

const V3FeatureSteps = dynamic(() =>
  import("./blocks/v3/featureSteps/featureSteps").then(
    (mod) => mod.V3FeatureSteps
  )
);

const V3Process = dynamic(() =>
  import("./blocks/v3/process/process").then((mod) => mod.V3Process)
);

const V3Statistics = dynamic(() => import("./blocks/v3/statistics/statistics"));

const V3Cta = dynamic(() =>
  import("./blocks/v3/cta/cta").then((mod) => mod.V3Cta)
);

const V3Testimonials = dynamic(() =>
  import("./blocks/v3/testimonials/testimonials").then(
    (mod) => mod.V3Testimonials
  )
);

const V3StackCards = dynamic(() =>
  import("./blocks/v3/stackCards/stackCards").then((mod) => mod.V3StackCards)
);

const V3Faq = dynamic(() =>
  import("./blocks/v3/faq/faq").then((mod) => mod.V3Faq)
);

const componentMap = {
  AboutUs,
  Carousel,
  Content,
  Breadcrumbs,
  ServiceCards,
  UpcomingEvents,
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
  UtilityButton,
  V3Hero,
  V3LogoCarousel,
  V3FeatureSteps,
  V3Process,
  V3Statistics,
  V3Cta,
  V3Testimonials,
  V3StackCards,
  V3Faq,
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
  // Only the first block is treated as the above-the-fold LCP candidate, so image
  // blocks below it don't all emit competing <link rel="preload"> hints.
  const blockProps = {
    ...blockData,
    data: blockData,
    parentField: field,
    priority: i === 0,
  };

  return (
    <div className="contents" data-tinafield={field}>
      <Component {...blockProps} />
    </div>
  );
};
