import { Components } from "tinacms/dist/rich-text";

import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";

export const componentRenderer: Components<{
    ClientLogos: Record<string, never>;
    CustomImage: {
      src: string;
      alt: string;
      height: number;
      width: number;
    };
    UpcomingEvents: {
      title: string;
      numberOfEvents: number;
    }
  }> = {
    ClientLogos: () => (
      <ClientLogos />
    ),
    CustomImage: (props) => (
      <CustomImage data={props} />
    ),
    UpcomingEvents: (props) => (
      <UpcomingEvents data={props} />
    ),
  };
