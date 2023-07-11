import dynamic from "next/dynamic";

const AboutUs = dynamic(() =>
  import("./blocks/aboutUs").then((mod) => mod.AboutUs)
);
const BuiltOnAzure = dynamic(() =>
  import("./blocks/builtOnAzure").then((mod) => mod.BuiltOnAzure)
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
const ServiceCards = dynamic(() =>
  import("./blocks/serviceCards").then((mod) => mod.ServiceCards)
);
const UpcomingEvents = dynamic(() =>
  import("./blocks/upcomingEvents").then((mod) => mod.UpcomingEvents)
);
const VerticalImageLayout = dynamic(() =>
  import("./blocks/verticalImageLayout").then((mod) => mod.VerticalImageLayout)
);
const VerticalListItem = dynamic(() =>
  import("./blocks/verticalListItem").then((mod) => mod.VerticalListItem)
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
    return null;
  }

  const field = `blocks.${i}`;
  const blockProps = { data: block, parentField: field };

  return (
    <div className="contents" data-tinafield={field} key={i + block.__typename}>
      <Component {...blockProps} />
    </div>
  );
};
