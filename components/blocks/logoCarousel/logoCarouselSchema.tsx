import { Template } from "tinacms";

export const LogoCarouselSchema: Template = {
  name: "logoCarousel",
  label: "Logo Carousel",
  ui: {
    previewSrc: "/images/thumbs/tina/logo-carousel.png",
  },
  fields: [
    //TODO – background selector once ImageTextBlock is merged in
    {
      type: "string",
      label: "Heading",
      name: "heading",
      description: "Heading text for the logo carousel.",
    },
    {
      type: "boolean",
      label: "Mask Images and Whiten",
      name: "isWhiteImages",
      description: "Completely saturates images so they appear white.",
      //TODO – account for dark mode.
    },
    {
      type: "object",
      label: "Logos",
      name: "logos",
      description: "Individual logos in the carousel.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.altText ?? "Logo" };
        },
      },
      fields: [
        {
          type: "image",
          label: "Logo Source",
          name: "logo",
          description: "The image to display in the carousel.",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description:
            "Alt text for the logo image. Deafults to 'Logo' under the hood.",
        },
      ],
    },
  ],
};
