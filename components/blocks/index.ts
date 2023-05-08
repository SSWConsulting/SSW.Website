import type { Template } from "tinacms";

import { agreementFormBlockSchema } from "../terms-and-conditions/agreementForm";
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
import { serviceCardsBlockSchema } from "./serviceCards";
import { subNewsLettersButtonSchema } from "./subNewsLettersButton";
import { tableBlockSchema } from "./tableLayout";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { verticalImageLayoutBlockSchema } from "./verticalImageLayout";
import { videoEmbedBlockSchema } from "./videoEmbed";

export const pageBlocks: Template[] = [
  aboutUsBlockSchema,
  agreementFormBlockSchema,
  builtOnAzureBlockSchema,
  carouselBlockSchema,
  clientLogosBlockSchema,
  verticalImageLayoutBlockSchema,
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
  fixedTabsLayoutSchema,
  citationBlockSchema,
  subNewsLettersButtonSchema,
  newslettersTableBlockSchema,
];

export * from "../terms-and-conditions/agreementForm";
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
export * from "./serviceCards";
export * from "./subNewsLettersButton";
export * from "./tableLayout";
export * from "./upcomingEvents";
export * from "./verticalImageLayout";
export * from "./videoEmbed";
