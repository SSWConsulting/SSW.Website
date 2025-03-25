import type { Template } from "tinacms";
import { clientLogosBlockSchema } from "../../components/blocks/clientLogos";
import { bookingButtonSchema } from "../bookingButton/bookingButton";
import { utilityButtonSchema } from "../button/utilityButton";
import { clientListSchema } from "../company/clientList";
import { tweetEmbedSchema } from "../embeds/tweetEmbed";
import { interestFormSchema } from "../events/interestForm";
import { inlineJotFormSchema } from "../inlineJotForm/inlineJotForm";
import { agreementFormBlockSchema } from "../terms-and-conditions/agreementForm";
import { eventBookingSchema } from "../training/eventBooking.schema";
import { locationBlockSchema } from "../training/locationBlock";
import { presenterBlockSchema } from "../training/presenterBlock";
import { trainingInformationSchema } from "../training/trainingInformation";
import { trainingLearningOutcomeSchema } from "../training/trainingLearningOutcome";
import { joinAsPresenterSchema } from "../usergroup/joinAsPresenter";
import { joinGithubSchema } from "../usergroup/joinGithub";
import { latestTechSchema } from "../usergroup/latestTech";
import { organizerSchema } from "../usergroup/organizer";
import { customDownloadButtonSchema } from "./CustomDownloadButton";
import { aboutUsBlockSchema } from "./aboutUs";
import { agendaSchema } from "./agenda";
import { BreadcrumbSchema } from "./breadcrumbs/breadcrumbs.schema";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { CardCarouselSchema } from "./cardCarousel/cardCarousel/cardCarouselSchema";
import { TechnologyCardCarouselSchema } from "./cardCarousel/technologyCards/technologyCardCarouselSchema";
import { carouselBlockSchema } from "./carousel";
import { citationBlockSchema } from "./citation";
import { colorBlockSchema } from "./colorBlock";
import { colorPaletteSchema } from "./colorPalette";
import { contentBlockSchema } from "./content";
import { contentCardBlockSchema } from "./contentCard.schema";
import { customImageBlockSchema } from "./customImage";
import { domainFromQuerySchema } from "./domainFromQuery";
import { downloadBlockSchema } from "./downloadBlock";
import { dynamicColumnsSchema } from "./dynamicColumns";
import { eventLinkSchema } from "./eventLink";
import { fixedColumnsSchema } from "./fixedColumns";
import { fixedTabsLayoutSchema } from "./fixedTabsLayout";
import { flagSchema } from "./flag";
import { googleMapsSchema } from "./googleMapsWrapper";
import { gridLayoutSchema } from "./gridLayout";
import { heroBlockSchema } from "./hero";
import { horizontalBlockSchema } from "./horizontalCard";
import { AccordionSchema } from "./imageComponents/accordionBlock/accordionSchema";
import { ImageTextBlockSchema } from "./imageComponents/imageTextBlock/imageTextBlock.schema";
import { internalCarouselBlockSchema } from "./internalCarousel";
import { jotFormEmbedSchema } from "./jotFormEmbed";
import { LogoCarouselSchema } from "./logoCarousel/logoCarouselSchema";
import { newslettersTableBlockSchema } from "./newslettersTable";
import { paymentBlockSchema } from "./payment-block";
import { recurringEventSchema } from "./recurringEvent";
import { sectionHeaderSchema } from "./sectionHeader";
import { serviceCardsBlockSchema } from "./serviceCards";
import { SpacerSchema } from "./spacer/spacer.schema";
import { tableBlockSchema } from "./tableLayout";
import { testimonialsListSchema } from "./testimonialsList";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { verticalImageLayoutBlockSchema } from "./verticalImageLayout";
import { verticalListItemSchema } from "./verticalListItem";
import { videoEmbedBlockSchema } from "./videoEmbed.schema";

//NOTE: this is the order that blocks will appear in the Tina Editor
export const pageBlocks: Template[] = [
  BreadcrumbSchema,
  ImageTextBlockSchema,
  LogoCarouselSchema,
  AccordionSchema,
  CardCarouselSchema,
  TechnologyCardCarouselSchema,
  SpacerSchema,
  aboutUsBlockSchema,
  agendaSchema,
  agreementFormBlockSchema,
  interestFormSchema,
  bookingButtonSchema,
  builtOnAzureBlockSchema,
  carouselBlockSchema,
  citationBlockSchema,
  clientListSchema,
  clientLogosBlockSchema,
  colorBlockSchema,
  colorPaletteSchema,
  contentBlockSchema,
  contentCardBlockSchema,
  customDownloadButtonSchema,
  customImageBlockSchema,
  domainFromQuerySchema,
  downloadBlockSchema,
  dynamicColumnsSchema,
  eventBookingSchema,
  eventLinkSchema,
  flagSchema,
  fixedColumnsSchema,
  fixedTabsLayoutSchema,
  googleMapsSchema,
  gridLayoutSchema,
  heroBlockSchema,
  horizontalBlockSchema,
  internalCarouselBlockSchema,
  joinAsPresenterSchema,
  joinGithubSchema,
  jotFormEmbedSchema,
  latestTechSchema,
  locationBlockSchema,
  newslettersTableBlockSchema,
  organizerSchema,
  paymentBlockSchema,
  presenterBlockSchema,
  recurringEventSchema,
  sectionHeaderSchema,
  serviceCardsBlockSchema,
  tableBlockSchema,
  testimonialsListSchema,
  trainingInformationSchema,
  trainingLearningOutcomeSchema,
  tweetEmbedSchema,
  upcomingEventsBlockSchema,
  utilityButtonSchema,
  verticalImageLayoutBlockSchema,
  verticalListItemSchema,
  videoEmbedBlockSchema,
  inlineJotFormSchema,
];
