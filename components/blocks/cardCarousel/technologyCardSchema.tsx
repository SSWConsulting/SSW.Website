import { Template } from "tinacms";
import { backgroundSchema } from "../../../components/layout/v2ComponentWrapper";
const TechnologyCardCarouselSchema: Template = {
  name: "technologyCardCarousel",
  label: "Technology Card Carousel",
  fields: [
    {
      type: "boolean",
      name: "isStacked",
      label: "Stacked Mode",
      description: "Remove the carousel effect and stack card entries.",
    },
    {
      type: "object",
      name: "technologyCards",
      label: "Technology Cards",
      list: true,
      fields: [
        {
          type: "reference",
          name: "technologyCard",
          label: "Technology Card",
          collections: ["technologies"],
        },
      ],
    },
    //@ts-expect-error – fields are not being recognized
    backgroundSchema,
  ],
};

export default TechnologyCardCarouselSchema;
