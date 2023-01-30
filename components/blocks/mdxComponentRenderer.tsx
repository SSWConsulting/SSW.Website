import { Components } from "tinacms/dist/rich-text";
import { UpcomingEvents } from "./upcomingEvents";
import { ClientLogos } from "./clientLogos";
import { CustomImage } from "./customImage";
import { VideoEmbed } from "./videoEmbed";

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
  }> = {
    VideoEmbed: (props) => (
      <VideoEmbed data={props} />
    ),
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
