import type { Template } from "tinacms";

import { aboutUsBlockSchema } from "./aboutUs";
import { contentBlockSchema } from "./content";
import { carouselBlockSchema } from "./carousel";
import { heroBlockSchema } from "./hero";
import { internalCarouselBlockSchema } from "./internalCarousel";
import { serviceCardsBlockSchema } from "./serviceCards";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { customImageBlockSchema } from "./customImage";
import { clientLogosBlockSchema } from "./clientLogos";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { columnLayoutBlockSchema } from "./columnLayout";
import { sswTableBlockSchema } from "./tables/sswTable";
import { citationBlockSchema } from "./citation";
import { subNewsLettersButtonSchema } from "./subNewsLettersButton";
import { googleMapsSchema } from "./googleMapsWrapper";
import { newsTableBlockSchema } from "./tables/newsTable";

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
	citationBlockSchema,
	sswTableBlockSchema,
	subNewsLettersButtonSchema,
	googleMapsSchema,
	internalCarouselBlockSchema,
	newsTableBlockSchema,
];

export * from "./aboutUs";
export * from "./booking";
export * from "./builtOnAzure";
export * from "./carousel";
export * from "./columnLayout";
export * from "./content";
export * from "./citation";
export * from "./clientLogos";
export * from "./customImage";
export * from "./googleMapsWrapper";
export * from "./hero";
export * from "./tables/newsTable";
export * from "./serviceCards";
export * from "./subNewsLettersButton";
export * from "./tables/sswTable";
export * from "./upcomingEvents";
export * from "./videoEmbed";
