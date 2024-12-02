import { Template } from "tinacms";

export const LogoCarouselSchema: Template = {
  name: "logoCarousel",
  label: "Logo Carousel",
  ui: {
    previewSrc: "/images/thumbs/tina/breadcrumbs.jpg",
  },
  fields: [
    //TODO – background selector once ImageTextBlock is merged in
    {
      type: "string",
      label: "Heading",
      name: "heading",
    },
    {
      type: "object",
      label: "Logos",
      name: "logos",
      description: "Individual logos in the carousel.",
      fields: [
        {
          type: "image",
          label: "Logo Source",
          name: "logo",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
        },
      ],
    },
  ],
};
