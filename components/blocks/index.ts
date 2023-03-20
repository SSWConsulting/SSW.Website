import type { Template } from "tinacms";

import { aboutUsBlockSchema } from "./aboutUs";
import { builtOnAzureBlockSchema } from "./builtOnAzure";
import { carouselBlockSchema } from "./carousel";
import { clientLogosBlockSchema } from "./clientLogos";
import { columnLayoutBlockSchema } from "./columnLayout";
import { contentBlockSchema } from "./content";
import { customImageBlockSchema } from "./customImage";
import { googleMapsSchema } from "./googleMapsWrapper";
import { heroBlockSchema } from "./hero";
import { serviceCardsBlockSchema } from "./serviceCards";
import { tableBlockSchema } from "./tableLayout";
import { upcomingEventsBlockSchema } from "./upcomingEvents";
import { videoEmbedBlockSchema } from "./videoEmbed";
import { columnLayoutBlockSchema } from "./columnLayout";
import { tableBlockSchema } from "./tableLayout";
import { agreementFormBlockSchema } from "../consulting/agreementForm";

export const pageBlocks: Template[] = [
	aboutUsBlockSchema,
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
	upcomingEventsBlockSchema,
	videoEmbedBlockSchema,
];

export * from "./aboutUs";
export * from "./builtOnAzure";
export * from "./carousel";
export * from "./clientLogos";
export * from "./columnLayout";
export * from "./content";
export * from "./customImage";
export * from "./googleMapsWrapper";
export * from "./hero";
export * from "./serviceCards";
export * from "./tableLayout";
export * from "./upcomingEvents";
export * from "./videoEmbed";
export * from "./columnLayout";
export * from "../consulting/agreementForm";
