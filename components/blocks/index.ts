import type { Template } from "tinacms";

import { bookingButtonSchema } from "../bookingButton/bookingButton";
import { utilityButtonSchema } from "../button/utilityButton";
import { subNewsletterRowSchema } from "../subNewsletter/subNewsletterRow";
import { agreementFormBlockSchema } from "../terms-and-conditions/agreementForm";
import { eventBookingSchema } from "../training/eventBooking";
import { locationBlockSchema } from "../training/locationBlock";
import { presenterBlockSchema } from "../training/presenterBlock";
import { trainingInformationSchema } from "../training/trainingInformation";
import { trainingLearningOutcomeSchema } from "../training/trainingLearningOutcome";
import { aboutUsBlockSchema } from "./aboutUs";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { carouselBlockSchema } from "./carousel";
import { citationBlockSchema } from "./citation";
import { clientLogosBlockSchema } from "./clientLogos";
import { contentBlockSchema } from "./content";
import { contentCardBlockSchema } from "./contentCard";
import { customImageBlockSchema } from "./customImage";
import { dynamicColumnsSchema } from "./dynamicColumns";
import { fixedColumnsSchema } from "./fixedColumns";
import { fixedTabsLayoutSchema } from "./fixedTabsLayout";
import { flagSchema } from "./flag";
import { googleMapsSchema } from "./googleMapsWrapper";
import { heroBlockSchema } from "./hero";
import { internalCarouselBlockSchema } from "./internalCarousel";
import { newslettersTableBlockSchema } from "./newslettersTable";
import { recurringEventSchema } from "./recurringEvent";
import { serviceCardsBlockSchema } from "./serviceCards";
import { tableBlockSchema } from "./tableLayout";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { verticalImageLayoutBlockSchema } from "./verticalImageLayout";
import { verticalListItemSchema } from "./verticalListItem";
import { videoEmbedBlockSchema } from "./videoEmbed";

export const pageBlocks: Template[] = [
  aboutUsBlockSchema,
  agreementFormBlockSchema,
  bookingButtonSchema,
  builtOnAzureBlockSchema,
  carouselBlockSchema,
  citationBlockSchema,
  clientLogosBlockSchema,
  contentBlockSchema,
  contentCardBlockSchema,
  customImageBlockSchema,
  dynamicColumnsSchema,
  flagSchema,
  fixedColumnsSchema,
  fixedTabsLayoutSchema,
  googleMapsSchema,
  heroBlockSchema,
  internalCarouselBlockSchema,
  newslettersTableBlockSchema,
  recurringEventSchema,
  serviceCardsBlockSchema,
  subNewsletterRowSchema,
  tableBlockSchema,
  trainingInformationSchema,
  trainingLearningOutcomeSchema,
  upcomingEventsBlockSchema,
  utilityButtonSchema,
  verticalImageLayoutBlockSchema,
  verticalListItemSchema,
  videoEmbedBlockSchema,
  eventBookingSchema,
  presenterBlockSchema,
  locationBlockSchema,
];

export * from "../bookingButton/bookingButton";
export * from "../button/utilityButton";
export * from "../subNewsletter/subNewsletterRow";
export * from "../terms-and-conditions/agreementForm";
export * from "../training/eventBooking";
export * from "../training/presenterBlock";
export * from "../training/trainingInformation";
export * from "../training/trainingLearningOutcome";
export * from "./aboutUs";
export * from "./builtOnAzure";
export * from "./carousel";
export * from "./citation";
export * from "./clientLogos";
export * from "./content";
export * from "./contentCard";
export * from "./customImage";
export * from "./dynamicColumns";
export * from "./fixedColumns";
export * from "./flag";
export * from "./googleMapsWrapper";
export * from "./hero";
export * from "./newslettersTable";
export * from "./recurringEvent";
export * from "./serviceCards";
export * from "./tableLayout";
export * from "./upcomingEvents";
export * from "./verticalImageLayout";
export * from "./verticalListItem";
export * from "./videoEmbed";
