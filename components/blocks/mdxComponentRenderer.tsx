import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { ColumnLayout } from "./columnLayout";
import { Carousel } from "./carousel";
import { TableLayout } from "./tableLayout";
import { Citation } from "./citation";
import { GoogleMapsWrapper } from "./googleMapsWrapper";
import { InternalCarousel } from "./internalCarousel";
import { SubNewsLettersButton } from "./subNewsLettersButton";
import { NewslettersTable } from "./newslettersTable";

export const componentRenderer: Components<{
	ClientLogos: Record<string, never>;
	CustomImage: {
		src: string;
		alt: string;
		height: number;
		width: number;
	};
	VideoEmbed: {
		url: string;
	};
	UpcomingEvents: {
		title: string;
		numberOfEvents: number;
	};
	ColumnLayout: {
		src: string;
		message: string;
	};
	Carousel: {
		items: {
			label: string;
			link: string;
			openIn: string;
			imgSrc: string;
		}[];
		backgroundColor: string;
	};
	TableLayout: {
		mdxTable: string;
	};
	Citation: {
		article: string;
		author: string;
	};
	GoogleMaps: {
		embedUrl: string;
		embedWidth: string;
		embedHeight: string;
	};
	InternalCarousel: {
		items: {
			label: string;
			imgSrc: string;
		}[];
		header: string;
		paragraph: string;
		website: string;
		technologies: {
			name: string;
		}[];
	};
	NewslettersTable: {
		headerText: string;
	};
	SubNewsLettersButton: {
		subscribeButtonText: string;
		headerText: string;
	};
}> = {
	VideoEmbed: (props) => <VideoEmbed data={props} />,
	ClientLogos: () => <ClientLogos />,
	CustomImage: (props) => <CustomImage data={props} />,
	UpcomingEvents: (props) => <UpcomingEvents data={props} />,
	ColumnLayout: (props) => <ColumnLayout data={props} />,
	Carousel: (props) => <Carousel data={props} />,
	TableLayout: (props) => <TableLayout data={props} />,
	Citation: (props) => <Citation {...props} />,
	GoogleMaps: (props) => <GoogleMapsWrapper {...props} />,
	InternalCarousel: (props) => <InternalCarousel data={props} />,
	NewslettersTable: (props) => <NewslettersTable data={props} />,
	SubNewsLettersButton: (props) => <SubNewsLettersButton {...props} />,
};
