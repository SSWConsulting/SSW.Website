import dynamic from 'next/dynamic';
import { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { TweetEmbedProps } from '../embeds/tweetEmbed';
import { SubNewsletterRowProps } from '../subNewsletter/subNewsletterRow';

const BookingButton = dynamic(() => import('../bookingButton/bookingButton').then(mod => mod.BookingButton));
const UtilityButton = dynamic(() => import('../button/utilityButton').then(mod => mod.UtilityButton));
const TweetEmbed = dynamic(() => import('../embeds/tweetEmbed').then(mod => mod.TweetEmbed));
const SubNewsletterRow = dynamic(() => import('../subNewsletter/subNewsletterRow').then(mod => mod.SubNewsletterRow));
const AgreementForm = dynamic(() => import('../terms-and-conditions/agreementForm').then(mod => mod.AgreementForm));
const TrainingInformation = dynamic(() => import('../training/trainingInformation').then(mod => mod.TrainingInformation));
const TrainingLearningOutcome = dynamic(() => import('../training/trainingLearningOutcome').then(mod => mod.TrainingLearningOutcome));
const Carousel = dynamic(() => import('./carousel').then(mod => mod.Carousel));
const Citation = dynamic(() => import('./citation').then(mod => mod.Citation));
const ClientLogos = dynamic(() => import('./clientLogos').then(mod => mod.ClientLogos));
const ContentCard = dynamic(() => import('./contentCard').then(mod => mod.ContentCard));
const CustomImage = dynamic(() => import('./customImage').then(mod => mod.CustomImage));
const DynamicColumns = dynamic(() => import('./dynamicColumns').then(mod => mod.DynamicColumns));
const FixedColumns = dynamic(() => import('./fixedColumns').then(mod => mod.FixedColumns));
const FixedTabsLayout = dynamic(() => import('./fixedTabsLayout').then(mod => mod.FixedTabsLayout));
const Flag = dynamic(() => import('./flag').then(mod => mod.Flag));
const GoogleMapsWrapper = dynamic(() => import('./googleMapsWrapper').then(mod => mod.GoogleMapsWrapper));
const InternalCarousel = dynamic(() => import('./internalCarousel').then(mod => mod.InternalCarousel));
const NewslettersTable = dynamic(() => import('./newslettersTable').then(mod => mod.NewslettersTable));
const RecurringEvent = dynamic(() => import('./recurringEvent').then(mod => mod.RecurringEvent));
const TableLayout = dynamic(() => import('./tableLayout').then(mod => mod.TableLayout));
const UpcomingEvents = dynamic(() => import('./upcomingEvents').then(mod => mod.UpcomingEvents));
const VerticalImageLayout = dynamic(() => import('./verticalImageLayout').then(mod => mod.VerticalImageLayout));
const VerticalListItem = dynamic(() => import('./verticalListItem').then(mod => mod.VerticalListItem));
const VideoEmbed = dynamic(() => import('./videoEmbed').then(mod => mod.VideoEmbed));

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
  BookingButton: (props) => <BookingButton {...props} />,
  NewslettersTable: (props) => <NewslettersTable data={props} />,
  SubNewsletterRow: (props) => <SubNewsletterRow {...props} />,
  Citation: (props) => <Citation {...props} />,
  UtilityButton: (props) => <UtilityButton {...props} />,
  ContentCard: (props) => <ContentCard data={props} />,
};
