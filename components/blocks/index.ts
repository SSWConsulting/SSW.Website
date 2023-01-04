import type { Template } from "tinacms";

import { contentBlockSchema } from "./content";
import { centerAlignedContentBlockSchema } from "./centerAlignedContent";
import { carouselBlockSchema } from "./carousel";
import { heroBlockSchema } from "./hero";
import { serviceCardsBlockSchema } from "./serviceCards";
import { upcomingEventsBlockSchema } from "./upcomingEvents";

export const pageBlocks: Template[] = [
    contentBlockSchema,
    centerAlignedContentBlockSchema,
    carouselBlockSchema,
    serviceCardsBlockSchema,
    heroBlockSchema,
    upcomingEventsBlockSchema,
];

export * from "./content";
export * from "./centerAlignedContent";
export * from "./carousel";
export * from "./hero";
export * from "./serviceCards";
export * from "./upcomingEvents";