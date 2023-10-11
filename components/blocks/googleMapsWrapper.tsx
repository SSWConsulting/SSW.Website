import type { Template } from "tinacms";

interface GoogleMapsWrapperProps {
  embedUrl: string;
  embedWidth: string;
  embedHeight: string;
}

export const GoogleMapsWrapper = (props: GoogleMapsWrapperProps) => (
  <>
    {props.embedUrl && (
      <iframe
        src={props.embedUrl}
        width={props.embedWidth || "100%"}
        height={props.embedHeight || "600px"}
        style={{ border: 0 }}
        allowFullScreen
      ></iframe>
    )}
  </>
);

export const googleMapsSchema: Template = {
  label: "Google Maps",
  name: "GoogleMaps",
  fields: [
    {
      type: "string",
      label: "URL",
      name: "embedUrl",
      required: true,
    },
    {
      type: "string",
      label: "Width",
      name: "embedWidth",
    },
    {
      type: "string",
      label: "Height",
      name: "embedHeight",
    },
  ],
};
