import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";
import { ColumnLayout } from "./columnLayout";
import { TableLayout } from "./tableLayout";

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
  TableLayout: {
    listofColumns: [
      {
        header: string;
        hours: string;
        listItem: [
          {
            item: string;
          }
        ];
      }
    ];
  };
}> = {
  VideoEmbed: (props) => <VideoEmbed data={props} />,
  ClientLogos: () => <ClientLogos />,
  CustomImage: (props) => <CustomImage data={props} />,
  UpcomingEvents: (props) => <UpcomingEvents data={props} />,
  ColumnLayout: (props) => <ColumnLayout data={props} />,
  TableLayout: (props) => <TableLayout {...props} />,
};
