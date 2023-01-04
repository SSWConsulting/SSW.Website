import { Components } from "tinacms/dist/rich-text";

import { UpcomingEvents } from "./index";

export const componentRenderer: Components<{
    UpcomingEvents: {
      title: string;
      numberOfEvents: number;
    };
  }> = {
    UpcomingEvents: (props) => {
      return (
        <UpcomingEvents data={props} />
      );
    },
  };