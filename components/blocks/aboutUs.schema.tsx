import { Template } from "tinacms";

export const aboutUsBlockSchema: Template = {
  name: "AboutUs",
  label: "About Us",

  ui: {
    previewSrc: "/images/thumbs/tina/about-us.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Background Color",
      name: "backgroundColor",
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
    {
      type: "boolean",
      label: "Show Map",
      name: "showMap",
      required: false,
    },
  ],
};

export const aboutUsBlock = {
  backgroundColor: "backgroundColor",
};
