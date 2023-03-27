import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { ColumnLayout } from "./columnLayout";
import { Carousel } from "./carousel";
import { TableLayout } from "./tableLayout";
import { SSWTable } from "./tables/sswTable";
import { Citation } from "./citation";
import { GoogleMapsWrapper } from "./googleMapsWrapper";
import { InternalCarousel } from "./internalCarousel";
import { NewsTable } from "./tables/newsTable";
import { SubButton } from "./subButton";

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
	SSWTable: {
		title: string;
		classNames: {
			head: string;
			body: string;
			title: string;
			container: string;
		};
		columns: Record<
			number,
			{
				label: string;
				key: string;
				className: string;
				align: string;
			}
		>;
		data: Record<
			number,
			{
				key: string;
				value: string;
				rowIndex: number;
				type: string;
				url: string;
			}
		>;
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
	NewsTable: Record<string, never>;
	SubButton: {
		subButtonText: string;
	};
}> = {
	VideoEmbed: (props) => <VideoEmbed data={props} />,
	ClientLogos: () => <ClientLogos />,
	CustomImage: (props) => <CustomImage data={props} />,
	UpcomingEvents: (props) => <UpcomingEvents data={props} />,
	ColumnLayout: (props) => <ColumnLayout data={props} />,
	Carousel: (props) => <Carousel data={props} />,
	TableLayout: (props) => <TableLayout data={props} />,
	SSWTable: (props) => <SSWTable {...props} />,
	Citation: (props) => <Citation {...props} />,
	GoogleMaps: (props) => <GoogleMapsWrapper {...props} />,
	InternalCarousel: (props) => <InternalCarousel data={props} />,
	NewsTable: () => <NewsTable />,
	SubButton: (props) => <SubButton data={props} />,
};
