import type { Template } from "tinacms";

import { aboutUsBlockSchema } from "./aboutUs";
import { contentBlockSchema } from "./content";
import { carouselBlockSchema } from "./carousel";
import { heroBlockSchema } from "./hero";
import { serviceCardsBlockSchema } from "./serviceCards";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { customImageBlockSchema } from "./customImage";
import { clientLogosBlockSchema } from "./clientLogos";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { columnLayoutBlockSchema } from "./columnLayout";

export const pageBlocks: Template[] = [
    aboutUsBlockSchema,
    contentBlockSchema,
    carouselBlockSchema,
    serviceCardsBlockSchema,
    heroBlockSchema,
    upcomingEventsBlockSchema,
    builtOnAzureBlockSchema,
    customImageBlockSchema,
    clientLogosBlockSchema,
    columnLayoutBlockSchema,
    videoEmbedBlockSchema
];

export * from "./carousel";
export * from "./serviceCards";
export * from "./upcomingEvents";
export * from "./builtOnAzure";
export * from "./customImage";
export * from "./clientLogos";
export * from "./videoEmbed";
export * from "./columnLayout";
