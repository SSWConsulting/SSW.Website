import type { Template } from "tinacms";

import { aboutUsBlockSchema } from "./aboutUs";
import { contentBlockSchema } from "./content";
import { carouselBlockSchema } from "./carousel";
import { heroBlockSchema } from "./hero";
import { serviceCardsBlockSchema } from "./serviceCards";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { benefitsBlockSchema } from "./benefits";
import { bookingBlockSchema } from "./booking";
import { technologiesBlockSchema } from "./technologies";
import { solutionBlockSchema } from "./solution";

export const pageBlocks: Template[] = [
    aboutUsBlockSchema,
    contentBlockSchema,
    carouselBlockSchema,
    serviceCardsBlockSchema,
    heroBlockSchema,
    upcomingEventsBlockSchema,
];

export const consultBlocks: Template[] = [
    bookingBlockSchema,
    benefitsBlockSchema,
    technologiesBlockSchema,
    solutionBlockSchema,
]

export * from "./aboutUs";
export * from "./content";
export * from "./carousel";
export * from "./hero";
export * from "./serviceCards";
export * from "./upcomingEvents";
export * from "./booking";
export * from "./benefits";
export * from "./technologies";
export * from "./solution";