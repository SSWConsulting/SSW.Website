import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { ColumnLayout } from "./columnLayout";
import { Carousel } from "./carousel";
import { TableLayout } from "./tableLayout";
import { VerticalListItem } from "./verticalListItem";

export const componentRenderer: Components<{
    ClientLogos: Record<string, never>;
    VerticalListItem: {
        icon: string,
        content: string,
    };
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
}> = {
    VideoEmbed: (props) => <VideoEmbed data={props} />,
    ClientLogos: () => <ClientLogos />,
    CustomImage: (props) => <CustomImage data={props} />,
    UpcomingEvents: (props) => <UpcomingEvents data={props} />,
    ColumnLayout: (props) => <ColumnLayout data={props} />,
    Carousel: (props) => <Carousel data={props} />,
    TableLayout: (props) => <TableLayout data={props} />,
    VerticalListItem: (props) => <VerticalListItem data={props} />,
};
