import type { Template } from "tinacms";

import { aboutUsBlockSchema } from "./aboutUs";
import { agreementFormBlockSchema } from "../terms-and-conditions/agreementForm";
import { carouselBlockSchema } from "./carousel";
import { contentBlockSchema } from "./content";
import { contentCardBlockSchema } from "./contentCard";
import { googleMapsSchema } from "./googleMapsWrapper";
import { heroBlockSchema } from "./hero";
import { internalCarouselBlockSchema } from "./internalCarousel";
import { serviceCardsBlockSchema } from "./serviceCards";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { customImageBlockSchema } from "./customImage";
import { clientLogosBlockSchema } from "./clientLogos";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { tableBlockSchema } from "./tableLayout";
import { dynamicColumnsSchema } from "./dynamicColumns";
import { fixedColumnsSchema } from "./fixedColumns";
import { verticalListItemSchema } from "./verticalListItem";
import { trainingLearningOutcomeSchema } from "../training/trainingLearningOutcome";
import { trainingInformationSchema } from "../training/trainingInformation";
import { recurringEventSchema } from "./recurringEvent";
import { flagSchema } from "./flag";
import { fixedTabsLayoutSchema } from "./fixedTabsLayout";
import { columnLayoutBlockSchema } from "./columnLayout";
import { citationBlockSchema } from "./citation";
import { subNewsLettersButtonSchema } from "./subNewsLettersButton";
import { newslettersTableBlockSchema } from "./newslettersTable";

export const pageBlocks: Template[] = [
  aboutUsBlockSchema,
  agreementFormBlockSchema,
  builtOnAzureBlockSchema,
  carouselBlockSchema,
  clientLogosBlockSchema,
  columnLayoutBlockSchema,
  contentBlockSchema,
  contentCardBlockSchema,
  customImageBlockSchema,
  flagSchema,
  googleMapsSchema,
  heroBlockSchema,
  serviceCardsBlockSchema,
  tableBlockSchema,
  dynamicColumnsSchema,
  upcomingEventsBlockSchema,
  videoEmbedBlockSchema,
  fixedColumnsSchema,
  internalCarouselBlockSchema,
  verticalListItemSchema,
  trainingLearningOutcomeSchema,
  trainingInformationSchema,
  recurringEventSchema,
  fixedTabsLayoutSchema,
  citationBlockSchema,
  subNewsLettersButtonSchema,
  newslettersTableBlockSchema,
];

export * from "./aboutUs";
export * from "../terms-and-conditions/agreementForm";
export * from "./builtOnAzure";
export * from "./carousel";
export * from "./columnLayout";
export * from "./content";
export * from "./contentCard";
export * from "./citation";
export * from "./clientLogos";
export * from "./customImage";
export * from "./fixedColumns";
export * from "./flag";
export * from "./googleMapsWrapper";
export * from "./hero";
export * from "./newslettersTable";
export * from "./serviceCards";
export * from "./tableLayout";
export * from "./dynamicColumns";
export * from "./subNewsLettersButton";
export * from "./upcomingEvents";
export * from "./videoEmbed";
export * from "./verticalListItem";
export * from "../training/trainingLearningOutcome";
export * from "../training/trainingInformation";
export * from "./recurringEvent";
