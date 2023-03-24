import React from "react";
import { AboutUs } from "./blocks/aboutUs";

import { Carousel } from "./blocks/carousel";
import { Content } from "./blocks/content";
import { ContentCard } from "./blocks/contentCard";
import { ServiceCards } from "./blocks/serviceCards";
import { UpcomingEvents } from "./blocks/upcomingEvents";
import { BuiltOnAzure } from "./blocks/builtOnAzure";
import { CustomImage } from "./blocks/customImage";
import { ClientLogos } from "./blocks/clientLogos";
import { ColumnLayout } from "./blocks/columnLayout";

const componentMap = {
	AboutUs: AboutUs,
	Carousel: Carousel,
	Content: Content,
	ServiceCards: ServiceCards,
	UpcomingEvents: UpcomingEvents,
	BuiltOnAzure: BuiltOnAzure,
	CustomImage: CustomImage,
	ClientLogos: ClientLogos,
	ColumnLayout: ColumnLayout,
	ContentCard: ContentCard,
};

export const Blocks = ({ prefix, blocks }) => {
	return (
		<div>
			{blocks ? blocks.map((block, i) => renderBlock(prefix, block, i)) : null}
		</div>
	);
};

const renderBlock = (prefix, block, i): JSX.Element => {
	const component = componentMap[block.__typename?.replace(prefix, "")];

	if (!component) {
		return null;
	}

	const field = `blocks.${i}`;
	const blockProps = { data: block, parentField: field };

	return (
		<div className="contents" data-tinafield={field} key={i + block.__typename}>
			{React.createElement(component, { ...blockProps })}
		</div>
	);
};
