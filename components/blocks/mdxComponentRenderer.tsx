import { Components } from "tinacms/dist/rich-text";

import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";

export const componentRenderer: Components<{
    UpcomingEvents: {
      title: string;
      numberOfEvents: number;
    };
  }> = {
    ClientLogos: () => {
      return (
        <ClientLogos />,
      );
    },
    UpcomingEvents: (props) => {
      return (
        <UpcomingEvents data={props} />
      );
    },
  };
