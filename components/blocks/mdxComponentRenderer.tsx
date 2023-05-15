import { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { VerticalImageLayout } from "./verticalImageLayout";
import { Carousel } from "./carousel";
import { TableLayout } from "./tableLayout";
import { AgreementForm } from "../terms-and-conditions/agreementForm";
import { Citation } from "./citation";
import { GoogleMapsWrapper } from "./googleMapsWrapper";
import { DynamicColumns } from "./dynamicColumns";
import { FixedColumns } from "./fixedColumns";
import { InternalCarousel } from "./internalCarousel";
import { VerticalListItem } from "./verticalListItem";
import TrainingInformation from "../training/trainingInformation";
import { TrainingLearningOutcome } from "../training/trainingLearningOutcome";
import { RecurringEvent } from "./recurringEvent";
import { FixedTabsLayout } from "./fixedTabsLayout";
import { CustomBookingButton } from "./customBookingButton";
import { Flag } from "./flag";
import { SubNewsLettersButton } from "./subNewsLettersButton";
import { NewslettersTable } from "./newslettersTable";

export const componentRenderer: Components<{
  ClientLogos: Record<string, never>;
  CustomImage: {
    src: string;
    alt: string;
    height: number;
    width: number;
  };
  RecurringEvent: {
    applyLinkRedirect: string;
    day: string;
  };
  VerticalListItem: {
    icon: string;
    content: string;
  };
  TrainingInformation: {
    body: string;
    header: string;
  };
  TrainingLearningOutcome: {
    header: string;
    listItems: {
      content: TinaMarkdownContent | TinaMarkdownContent[];
      icon: string;
      title: string;
    }[];
  };
  DynamicColumns: {
    colBody: TinaMarkdownContent;
    colCount: number;
  };
  FixedColumns: {
    firstColBody: TinaMarkdownContent;
    secondColBody: TinaMarkdownContent;
  };
  VideoEmbed: {
    url: string;
  };
  UpcomingEvents: {
    title: string;
    numberOfEvents: number;
  };
  VerticalImageLayout: {
    src: string;
    message: string;
  };
  Carousel: {
    items: {
      label: string;
      link: string;
      openIn: string;
      imgSrc: string;
    }[];
    backgroundColor: string;
  };
  Flag: {
    country: string;
  };
  TableLayout: {
    mdxTable: string;
  };
  AgreementForm: {
    backgroundColor: string;
    fields: {
      id: string;
      label: string;
      placeholder: string;
      resizeable: boolean;
    }[];
  };
  GoogleMaps: {
    embedUrl: string;
    embedWidth: string;
    embedHeight: string;
  };
  InternalCarousel: {
    items: {
      label: string;
      imgSrc: string;
    }[];
    header: string;
    paragraph: string;
    website: string;
    technologies: {
      name: string;
    }[];
  };
  FixedTabsLayout: {
    tab1: string;
    heading1: string;
    tab1Body: string;
    tab2: string;
    heading2: string;
    tab2Body: string;
  };
  CustomBookingButton: {
    btnText: string;
  };
  NewslettersTable: {
    headerText: string;
  };
  SubNewsLettersButton: {
    subscribeButtonText: string;
    headerText: string;
  };
  Citation: {
    article: string;
    author: string;
  };
}> = {
  AgreementForm: (props) => <AgreementForm data={props} />,
  ClientLogos: () => <ClientLogos />,
  VerticalImageLayout: (props) => <VerticalImageLayout data={props} />,
  CustomImage: (props) => <CustomImage data={props} />,
  Flag: (props) => <Flag country={props.country} />,
  UpcomingEvents: (props) => <UpcomingEvents data={props} />,
  Carousel: (props) => <Carousel data={props} />,
  TableLayout: (props) => <TableLayout data={props} />,
  VideoEmbed: (props) => <VideoEmbed data={props} />,
  GoogleMaps: (props) => <GoogleMapsWrapper {...props} />,
  DynamicColumns: (props) => <DynamicColumns data={props} />,
  FixedColumns: (props) => <FixedColumns data={props} />,
  InternalCarousel: (props) => <InternalCarousel data={props} />,
  VerticalListItem: (props) => <VerticalListItem data={props} />,
  TrainingInformation: (props) => <TrainingInformation data={props} />,
  TrainingLearningOutcome: (props) => <TrainingLearningOutcome data={props} />,
  RecurringEvent: (props) => <RecurringEvent data={props} />,
  FixedTabsLayout: (props) => <FixedTabsLayout data={props} />,
  CustomBookingButton: (props) => <CustomBookingButton data={props} />,
  NewslettersTable: (props) => <NewslettersTable data={props} />,
  SubNewsLettersButton: (props) => <SubNewsLettersButton {...props} />,
  Citation: (props) => <Citation {...props} />,
};
