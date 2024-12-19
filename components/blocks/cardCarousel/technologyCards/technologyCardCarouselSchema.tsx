import { Template } from "tinacms";
import { backgroundSchema } from "../../../../components/layout/v2ComponentWrapper";

export const TechnologyCardCarouselSchema: Template = {
  name: "technologyCardCarousel",
  label: "<V2> Card Carousel (Technology)",
  ui: {
    previewSrc: "/images/thumbs/tina/card-carousel.jpg",
  },
  fields: [
    {
      type: "object",
      label: "Technology Groups",
      name: "technologyGroups",
      list: true,
      fields: [
        {
          type: "reference",
          label: "Technology Group",
          name: "technologyGroup",
          collections: ["technologyGroupsv2"],
        },
      ],
    },
    {
      type: "boolean",
      label: "Stacked Mode",
      name: "isStacked",
      description: "Remove the carousel effect and stack card entries.",
    },
    //@ts-expect-error – fields are not being recognized
    backgroundSchema,
  ],
};
