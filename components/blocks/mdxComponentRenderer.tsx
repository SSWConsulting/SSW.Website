import dynamic from "next/dynamic";
import { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";

import { UtilityButton } from "../button/utilityButton";
import { TweetEmbed, TweetEmbedProps } from "../embeds/tweetEmbed";
import MicrosoftPanel from "../offices/microsoftPanel";
import {
  SubNewsletterRow,
  SubNewsletterRowProps,
} from "../subNewsletter/subNewsletterRow";
import { AgreementForm } from "../terms-and-conditions/agreementForm";
import TrainingInformation from "../training/trainingInformation";
import { TrainingLearningOutcome } from "../training/trainingLearningOutcome";
import { Countries } from "../util/constants/country";
import { CustomDownloadButton } from "./CustomDownloadButton";
import { Citation } from "./citation";
import { ClientLogos } from "./clientLogos";
import { ColorBlock, ColorBlockProps } from "./colorBlock";
import { ContentCard } from "./contentCard";
import { CustomImage, CustomImageProps } from "./customImage";
import { DynamicColumns } from "./dynamicColumns";
import { EventLink, EventLinkProps } from "./eventLink";
import { ExpertBlock, ExpertBlockProps } from "./expertBlock";
import { FixedColumns } from "./fixedColumns";
import { FixedTabsLayout } from "./fixedTabsLayout";
import { Flag } from "./flag";
import { GoogleMapsWrapper } from "./googleMapsWrapper";
import { JotFormEmbed, JotFormEmbedProps } from "./jotFormEmbed";
import { NewslettersTable } from "./newslettersTable";
import { RecurringEvent } from "./recurringEvent";
import { TableLayout, TableLayoutProps } from "./tableLayout";
import { TestimonialsList } from "./testimonialsList";
import {
  TripleColumnImageBlock,
  TripleColumnImageBlockProps,
} from "./tripleColumnImageBlock";
import { UpcomingEvents } from "./upcomingEvents";
import { VerticalImageLayout } from "./verticalImageLayout";
import { VerticalListItem } from "./verticalListItem";
import { VideoEmbed } from "./videoEmbed";
import { YoutubePlaylistBlock, YoutubePlaylistProps } from "./youtubePlaylist";

// Import heavy components dynamically
const Carousel = dynamic(
  () => import("./carousel").then((mod) => mod.Carousel),
  {
    ssr: false,
  }
);

const InternalCarousel = dynamic(
  () => import("./internalCarousel").then((mod) => mod.InternalCarousel),
  { ssr: false }
);

const BookingButton = dynamic(
  () =>
    import("../bookingButton/bookingButton").then((mod) => mod.BookingButton),
  { ssr: false }
);

export const componentRenderer: Components<{
  ClientLogos: Record<string, never>;
  CustomImage: CustomImageProps;
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
  TweetEmbed: TweetEmbedProps;
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
    delay: number;
    backgroundColor: string;
  };
  Flag: {
    country: Countries;
  };
  TableLayout: TableLayoutProps;
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
  BookingButton: {
    buttonText: string;
  };
  NewslettersTable: {
    headerText: string;
  };
  SubNewsletterRow: SubNewsletterRowProps;
  Citation: {
    article: string;
    author: string;
  };
  UtilityButton: {
    buttonText: string;
    link: string;
  };
  ContentCard: {
    content: TinaMarkdownContent;
  };
  MicrosoftPanel: Record<string, never>;
  TestimonialsList: {
    excludedCategories?: string[] | undefined;
  };
  EventLink: EventLinkProps;
  ExpertBlock: ExpertBlockProps;
  TripleColumnImageBlock: TripleColumnImageBlockProps;
  YoutubePlaylistBlock: {
    youtubePlaylist: YoutubePlaylistProps;
  };
  CustomDownloadButton: {
    btnText: string;
    btnLink: string;
  };
  JotFormEmbed: JotFormEmbedProps;
  ColorBlock: ColorBlockProps;
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
  TweetEmbed: (props) => <TweetEmbed {...props} />,
  RecurringEvent: (props) => <RecurringEvent data={props} />,
  FixedTabsLayout: (props) => <FixedTabsLayout data={props} />,
  BookingButton: (props) => <BookingButton data={props} />,
  NewslettersTable: (props) => <NewslettersTable data={props} />,
  SubNewsletterRow: (props) => <SubNewsletterRow {...props} />,
  Citation: (props) => <Citation {...props} />,
  UtilityButton: (props) => <UtilityButton {...props} />,
  ContentCard: (props) => <ContentCard data={props} />,
  MicrosoftPanel: () => <MicrosoftPanel />,
  TestimonialsList: (props) => <TestimonialsList data={props} />,
  EventLink: (props) => <EventLink {...props} />,
  ExpertBlock: (props) => <ExpertBlock {...props} />,
  TripleColumnImageBlock: (props) => <TripleColumnImageBlock {...props} />,
  CustomDownloadButton: (props) => <CustomDownloadButton data={props} />,
  YoutubePlaylistBlock: (props) => (
    <YoutubePlaylistBlock {...props.youtubePlaylist} />
  ),
  JotFormEmbed: (props) => <JotFormEmbed {...props} />,
  ColorBlock: (props) => <ColorBlock {...props} />,
};
