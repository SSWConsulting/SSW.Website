import { Components, TinaMarkdownContent } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { VerticalImageLayout } from "./verticalImageLayout";
import { Carousel } from "./carousel";
import { TableLayout } from "./tableLayout";
import { AgreementForm } from "../terms-and-conditions/agreementForm";
import { GoogleMapsWrapper } from "./googleMapsWrapper";
import { DynamicColumns } from "./dynamicColumns";
import { FixedColumns } from "./fixedColumns";
import { InternalCarousel } from "./internalCarousel";

export const componentRenderer: Components<{
	ClientLogos: Record<string, never>;
	CustomImage: {
		src: string;
		alt: string;
		height: number;
		width: number;
	};
	DynamicColumns: {
		colBody: TinaMarkdownContent;
		colCount: number;
	};
	FixedColumns: {
		firstColBody: TinaMarkdownContent;
		secondColBody: TinaMarkdownContent;
	}
	VideoEmbed: {
		url: string;
	};
	UpcomingEvents: {
		title: string;
		numberOfEvents: number;
	};
	VerticalImageLayout: {
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
	AgreementForm: {
		backgroundColor: string;
		fields: {
			id: string;
			label: string;
			placeholder: string;
			resizeable: boolean;
		}[]
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
}> = {
	AgreementForm: (props) => <AgreementForm data={props} />,
	ClientLogos: () => <ClientLogos />,
	VerticalImageLayout: (props) => <VerticalImageLayout data={props} />,
	CustomImage: (props) => <CustomImage data={props} />,
	UpcomingEvents: (props) => <UpcomingEvents data={props} />,
	Carousel: (props) => <Carousel data={props} />,
	TableLayout: (props) => <TableLayout data={props} />,
	VideoEmbed: (props) => <VideoEmbed data={props} />,
	GoogleMaps: (props) => <GoogleMapsWrapper {...props} />,
	DynamicColumns: (props) => <DynamicColumns data={props} />,
	FixedColumns: (props) => <FixedColumns data={props} />,
	InternalCarousel: (props) => <InternalCarousel data={props} />,
};
