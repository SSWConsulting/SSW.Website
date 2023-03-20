import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { ColumnLayout } from "./columnLayout";
import { Carousel } from "./carousel";
import { TableLayout } from "./tableLayout";
import { AgreementForm } from "../consulting/agreementForm";

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
	AgreementForm: {
		backgroundColor: string;
	};
}> = {
	AgreementForm: (props) => <AgreementForm data={props} />,
	ClientLogos: () => <ClientLogos />,
	ColumnLayout: (props) => <ColumnLayout data={props} />,
	CustomImage: (props) => <CustomImage data={props} />,
	UpcomingEvents: (props) => <UpcomingEvents data={props} />,
	Carousel: (props) => <Carousel data={props} />,
	TableLayout: (props) => <TableLayout data={props} />,
	VideoEmbed: (props) => <VideoEmbed data={props} />,
};
