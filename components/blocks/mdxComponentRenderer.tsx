import dynamic from "next/dynamic";
import { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import type { TweetEmbedProps } from "../embeds/tweetEmbed";
import type { Countries } from "../util/constants/country";
import type { ColorBlockProps } from "./colorBlock";
import type { CustomImageProps } from "./customImage";
import { DynamicCardGridBlockProps } from "./dynamicCardGridBlock";
import type { EventLinkProps } from "./eventLink";
import type { ExpertBlockProps } from "./expertBlock";
import type { JotFormEmbedProps } from "./jotFormEmbed";
import type { TableLayoutProps } from "./tableLayout";
import type { YoutubePlaylistProps } from "./youtubePlaylist";

import { BookingButton } from "../bookingButton/bookingButton";
import { InlineJotFormProps } from "../inlineJotForm/inlineJotForm";
import { Content, ContentType } from "./content";
import { DomainFromQueryProps } from "./domainFromQuery";
import { SectionHeaderProps } from "./sectionHeader";

const UtilityButton = dynamic(() =>
  import("../button/utilityButton").then((mod) => mod.UtilityButton)
);
const TweetEmbed = dynamic<TweetEmbedProps>(() =>
  import("../embeds/tweetEmbed").then((mod) => mod.TweetEmbed)
);
const MicrosoftPanel = dynamic(() =>
  import("../offices/microsoftPanel").then((mod) => mod.default)
);
const AgreementForm = dynamic(() =>
  import("../terms-and-conditions/agreementForm").then(
    (mod) => mod.AgreementForm
  )
);
const TrainingInformation = dynamic(() =>
  import("../training/trainingInformation").then((mod) => mod.default)
);
const TrainingLearningOutcome = dynamic(() =>
  import("../training/trainingLearningOutcome").then(
    (mod) => mod.TrainingLearningOutcome
  )
);
const CustomDownloadButton = dynamic(() =>
  import("./CustomDownloadButton").then((mod) => mod.CustomDownloadButton)
);
const Carousel = dynamic(() =>
  import("./carousel").then((mod) => mod.Carousel)
);
const Citation = dynamic(() =>
  import("./citation").then((mod) => mod.Citation)
);
const ClientLogos = dynamic(() =>
  import("./clientLogos").then((mod) => mod.ClientLogos)
);
const ColorBlock = dynamic<ColorBlockProps>(() =>
  import("./colorBlock").then((mod) => mod.ColorBlock)
);
const ContentCard = dynamic(() =>
  import("./contentCard").then((mod) => mod.ContentCard)
);
const CustomImage = dynamic<{ data: CustomImageProps }>(() =>
  import("./customImage").then((mod) => mod.CustomImage)
);
const DynamicColumns = dynamic(() =>
  import("./dynamicColumns").then((mod) => mod.DynamicColumns)
);
const DomainFromQuery = dynamic(() =>
  import("./domainFromQuery").then((mod) => mod.DomainFromQuery)
);
const EventLink = dynamic<EventLinkProps>(() =>
  import("./eventLink").then((mod) => mod.EventLink)
);
const ExpertBlock = dynamic<ExpertBlockProps>(() =>
  import("./expertBlock").then((mod) => mod.ExpertBlock)
);
const FixedColumns = dynamic(() =>
  import("./fixedColumns").then((mod) => mod.FixedColumns)
);
const FixedTabsLayout = dynamic(() =>
  import("./fixedTabsLayout").then((mod) => mod.FixedTabsLayout)
);
const Flag = dynamic(() => import("./flag").then((mod) => mod.Flag));
const ColorPalette = dynamic(() =>
  import("./colorPalette").then((mod) => mod.ColorPalette)
);
const GoogleMapsWrapper = dynamic(() =>
  import("./googleMapsWrapper").then((mod) => mod.GoogleMapsWrapper)
);
const InlineJotForm = dynamic(() =>
  import("../inlineJotForm/inlineJotForm").then((mod) => mod.InlineJotForm)
);
const InternalCarousel = dynamic(() =>
  import("./internalCarousel").then((mod) => mod.InternalCarousel)
);
const JotFormEmbed = dynamic<JotFormEmbedProps>(() =>
  import("./jotFormEmbed").then((mod) => mod.JotFormEmbed)
);
const NewslettersTable = dynamic(() =>
  import("./newslettersTable").then((mod) => mod.NewslettersTable)
);
const RecurringEvent = dynamic(() =>
  import("./recurringEvent").then((mod) => mod.RecurringEvent)
);
const TableLayout = dynamic<{ data: TableLayoutProps }>(() =>
  import("./tableLayout").then((mod) => mod.TableLayout)
);
const TestimonialsList = dynamic(() =>
  import("./testimonialsList").then((mod) => mod.TestimonialsList)
);
const DynamicCardGridBlock = dynamic<DynamicCardGridBlockProps>(() =>
  import("./dynamicCardGridBlock").then((mod) => mod.DynamicCardGridBlock)
);
const UpcomingEvents = dynamic(() =>
  import("./upcomingEvents").then((mod) => mod.UpcomingEvents)
);
const VerticalImageLayout = dynamic(() =>
  import("./verticalImageLayout").then((mod) => mod.VerticalImageLayout)
);
const VerticalListItem = dynamic(() =>
  import("./verticalListItem").then((mod) => mod.VerticalListItem)
);
const VideoEmbed = dynamic(() =>
  import("./videoEmbed").then((mod) => mod.VideoEmbed)
);
const YoutubePlaylistBlock = dynamic<YoutubePlaylistProps>(() =>
  import("./youtubePlaylist").then((mod) => mod.YoutubePlaylistBlock)
);
const SectionHeader = dynamic(() =>
  import("./sectionHeader").then((mod) => mod.SectionHeader)
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
  DynamicCardGridBlock: DynamicCardGridBlockProps;
  YoutubePlaylistBlock: {
    youtubePlaylist: YoutubePlaylistProps;
  };
  CustomDownloadButton: {
    btnText: string;
    btnLink: string;
  };
  JotFormEmbed: JotFormEmbedProps;
  ColorBlock: ColorBlockProps;
  ColorPalette: ColorPaletteProps;
  SectionHeader: SectionHeaderProps;
  Content: ContentType;
  DomainFromQuery: DomainFromQueryProps;
  InlineJotForm: InlineJotFormProps;
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
  Citation: (props) => <Citation {...props} />,
  UtilityButton: (props) => <UtilityButton {...props} />,
  ContentCard: (props) => <ContentCard data={props} />,
  MicrosoftPanel: () => <MicrosoftPanel />,
  TestimonialsList: (props) => <TestimonialsList data={props} />,
  EventLink: (props) => <EventLink {...props} />,
  ExpertBlock: (props) => <ExpertBlock {...props} />,
  DynamicCardGridBlock: (props) => <DynamicCardGridBlock {...props} />,
  CustomDownloadButton: (props) => <CustomDownloadButton data={props} />,
  YoutubePlaylistBlock: (props) => (
    <YoutubePlaylistBlock {...props.youtubePlaylist} />
  ),
  JotFormEmbed: (props) => <JotFormEmbed {...props} />,
  ColorBlock: (props) => <ColorBlock {...props} />,
  ColorPalette: (props) => <ColorPalette {...props} />,
  SectionHeader: (props) => <SectionHeader {...props} />,
  Content: (props) => <Content data={props} />,
  DomainFromQuery: (props) => <DomainFromQuery {...props} />,
  InlineJotForm: (props) => <InlineJotForm {...props} />,
};
