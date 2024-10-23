import { Template } from "tinacms";

export const clientLogosBlockSchema: Template = {
  name: "ClientLogos",
  label: "Client Logos",
  ui: {
    previewSrc: "/images/thumbs/tina/client-logos.jpg",
  },
  // Todo: Find a way to have no fields - the one below is to satisfy compiler
  fields: [
    {
      type: "string",
      label: "Alt text",
      name: "altText",
      required: true,
    },
  ],
};
