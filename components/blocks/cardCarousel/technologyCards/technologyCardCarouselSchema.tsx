import type { Template } from "tinacms";
import { wrapperBaseFields } from "../../../../components/layout/v2ComponentWrapper.schema";
import { cardOptions } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { ColorPickerInput } from "../../../blocksSubtemplates/tinaFormElements/colourSelector";

export const TechnologyCardCarouselSchema: Template = {
  name: "technologyCardCarousel",
  label: "<V2> Card Carousel (Technology)",
  ui: {
    previewSrc: "/images/thumbs/tina/card-carousel.jpg",
  },
  fields: [
    {
      type: "object",
      label: "Technologies",
      name: "technologies",
      list: true,
      ui: {
        itemProps: (item) => {
          const name = item.technology?.split("/");
          return {
            label: name ? name[name.length - 1].split(".")[0] : "Technology",
          };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Technology",
          name: "technology",
          collections: ["technologiesv2"],
          ui: {
            optionComponent: (props, _internalSys: { path: string }) => {
              const filename = _internalSys.path.split("/");
              return (
                filename[filename.length - 1].split(".")[0] ?? _internalSys.path
              );
            },
          },
        },
      ],
    },
    {
      type: "boolean",
      label: "Stacked Mode",
      name: "isStacked",
      description: "Remove the carousel effect and stack card entries.",
    },
    // @ts-expect-error – Tina 3.8.x: custom ui.component type no longer matches Field
    {
      type: "number",
      label: "Card Style",
      name: "techCardStyle",
      ui: {
        component: ColorPickerInput(cardOptions),
      },
    },
    ...wrapperBaseFields,
  ],
};
