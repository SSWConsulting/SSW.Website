import type { Template } from "tinacms";

import { bookingButtonSchema } from "../bookingButton/bookingButton";
import { utilityButtonSchema } from "../button/utilityButton";
import { clientListSchema } from "../company/clientList";
import { tweetEmbedSchema } from "../embeds/tweetEmbed";
import { interestFormSchema } from "../events/interestForm";
import { inlineJotFormSchema } from "../inlineJotForm/inlineJotForm";
import { agreementFormBlockSchema } from "../terms-and-conditions/agreementForm";
import { eventBookingSchema } from "../training/eventBooking";
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
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { carouselBlockSchema } from "./carousel";
import { citationBlockSchema } from "./citation";
import { clientLogosBlockSchema } from "./clientLogos";
import { colorBlockSchema } from "./colorBlock";
import { colorPaletteSchema } from "./colorPalette";
import { contentBlockSchema } from "./content";
import { contentCardBlockSchema } from "./contentCard";
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
import { internalCarouselBlockSchema } from "./internalCarousel";
import { jotFormEmbedSchema } from "./jotFormEmbed";
import { newslettersTableBlockSchema } from "./newslettersTable";
import { paymentBlockSchema } from "./payment-block";
import { recurringEventSchema } from "./recurringEvent";
import { sectionHeaderSchema } from "./sectionHeader";
import { serviceCardsBlockSchema } from "./serviceCards";
import { tableBlockSchema } from "./tableLayout";
import { testimonialsListSchema } from "./testimonialsList";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { verticalImageLayoutBlockSchema } from "./verticalImageLayout";
import { verticalListItemSchema } from "./verticalListItem";
import { videoEmbedBlockSchema } from "./videoEmbed";

export const pageBlocks: Template[] = [
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
  inlineJotFormSchema
];

export * from "../bookingButton/bookingButton";
export * from "../button/utilityButton";
export * from "../embeds/tweetEmbed";
export * from "../inlineJotForm/inlineJotForm";
export * from "../terms-and-conditions/agreementForm";
export * from "../training/eventBooking";
export * from "../training/presenterBlock";
export * from "../training/trainingInformation";
export * from "../training/trainingLearningOutcome";
export * from "../usergroup/joinAsPresenter";
export * from "../usergroup/joinGithub";
export * from "../usergroup/latestTech";
export * from "../usergroup/organizer";
export * from "./CustomDownloadButton";
export * from "./aboutUs";
export * from "./builtOnAzure";
export * from "./carousel";
export * from "./citation";
export * from "./clientLogos";
export * from "./colorBlock";
export * from "./colorPalette";
export * from "./content";
export * from "./contentCard";
export * from "./customImage";
export * from "./domainFromQuery";
export * from "./dynamicColumns";
export * from "./eventLink";
export * from "./fixedColumns";
export * from "./flag";
export * from "./googleMapsWrapper";
export * from "./hero";
export * from "./jotFormEmbed";
export * from "./newslettersTable";
export * from "./recurringEvent";
export * from "./sectionHeader";
export * from "./serviceCards";
export * from "./tableLayout";
export * from "./testimonialsList";
export * from "./upcomingEvents";
export * from "./verticalImageLayout";
export * from "./verticalListItem";
export * from "./videoEmbed";

