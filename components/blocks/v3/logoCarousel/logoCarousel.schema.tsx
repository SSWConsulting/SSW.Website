import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3LogoCarouselSchema: Template = {
  name: "v3LogoCarousel",
  label: "<V3> Logo Carousel",
  ui: {
    defaultItem: {
      heading: "Trusted by **industry leaders**",
      logos: [{ logo: "", altText: "Logo" }],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    {
      type: "boolean",
      name: "paused",
      label: "Paused",
      description: "Remember to enable this before deploying to production.",
    },
    {
      type: "boolean",
      label: "Mask Images and Whiten",
      name: "isWhiteImages",
      description: "Completely saturates images so they appear white.",
    },
    {
      type: "object",
      label: "Logos",
      name: "logos",
      description: "Individual logos in the carousel.",
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.altText ?? "Logo" }),
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
          description: "Alt text for the logo image. Defaults to 'Logo'.",
        },
      ],
    },
  ],
};
