import type { Template } from "tinacms";

import { aboutUsBlockSchema } from "./aboutUs";
import { agreementFormBlockSchema } from "../terms-and-conditions/agreementForm";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { carouselBlockSchema } from "./carousel";
import { clientLogosBlockSchema } from "./clientLogos";
import { columnLayoutBlockSchema } from "./columnLayout";
import { contentBlockSchema } from "./content";
import { customImageBlockSchema } from "./customImage";
import { googleMapsSchema } from "./googleMapsWrapper";
import { heroBlockSchema } from "./hero";
import { serviceCardsBlockSchema } from "./serviceCards";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { tableBlockSchema } from "./tableLayout";
import { dynamicColumnsSchema } from "./dynamicColumns";
import { fixedColumnsSchema } from "./fixedColumns";

export const pageBlocks: Template[] = [
  aboutUsBlockSchema,
  agreementFormBlockSchema,
  builtOnAzureBlockSchema,
  carouselBlockSchema,
  clientLogosBlockSchema,
  columnLayoutBlockSchema,
  contentBlockSchema,
  customImageBlockSchema,
  googleMapsSchema,
  heroBlockSchema,
  serviceCardsBlockSchema,
  tableBlockSchema,
  dynamicColumnsSchema,
  upcomingEventsBlockSchema,
  videoEmbedBlockSchema,
  fixedColumnsSchema,
];

export * from "./aboutUs";
export * from "../terms-and-conditions/agreementForm";
export * from "./builtOnAzure";
export * from "./carousel";
export * from "./clientLogos";
export * from "./columnLayout";
export * from "./content";
export * from "./customImage";
export * from "./fixedColumns";
export * from "./googleMapsWrapper";
export * from "./hero";
export * from "./serviceCards";
export * from "./tableLayout";
export * from "./dynamicColumns";
export * from "./upcomingEvents";
export * from "./videoEmbed";
