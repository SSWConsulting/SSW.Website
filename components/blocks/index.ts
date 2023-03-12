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
import { TableBlockSchema } from "./tableLayout";
import { contentCardBlockSchema } from "./contentCard";

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
	videoEmbedBlockSchema,
	TableBlockSchema,
	contentCardBlockSchema,
];

export * from "./aboutUs";
export * from "./content";
export * from "./carousel";
export * from "./hero";
export * from "./serviceCards";
export * from "./upcomingEvents";
export * from "./builtOnAzure";
export * from "./customImage";
export * from "./clientLogos";
export * from "./booking";
export * from "./videoEmbed";
export * from "./columnLayout";
export * from "./contentCard";
