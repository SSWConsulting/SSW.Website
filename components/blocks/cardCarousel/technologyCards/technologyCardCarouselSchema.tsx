import { Template } from "tinacms";
import { backgroundSchema } from "../../../../components/layout/v2ComponentWrapper.schema";
import { cardOptions } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/cardOptions";
import { ColorPickerInput } from "../../../blocksSubtemplates/tinaFormElements/colourSelector";

export const TechnologyCardCarouselSchema: Template = {
  name: "technologyCardCarousel",
  label: "<V2> Card Carousel (Technology)",
  ui: {
    previewSrc: "/images/thumbs/tina/card-carousel.jpg",
  },
  fields: [
    // {
    //   type: "object",
    //   label: "Technology Groups",
    //   name: "technologyGroups",
    //   list: true,
    //   ui: {
    //     itemProps: (item) => {
    //       const name = item.technologyGroup?.split("/");
    //       return {
    //         label: name
    //           ? name[name.length - 1].split(".")[0]
    //           : "Technology Group",
    //       };
    //     },
    //   },
    //   fields: [
    //     {
    //       type: "reference",
    //       label: "Technology Group",
    //       name: "technologyGroup",
    //       collections: ["technologyGroupsv2"],
    //       ui: {
    //         optionComponent: (props: { name: string }, _internalSys) => {
    //           return props.name ?? _internalSys.path;
    //         },
    //       },
    //     },
    //   ],
    // },
    {
      type: "object",
      label: "Individual Technologies",
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
            optionComponent: (props: { name: string }, _internalSys) => {
              return props.name ?? _internalSys.path;
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
    {
      type: "number",
      label: "Card Style",
      name: "techCardStyle",
      ui: {
        // @ts-expect-error – component is not being recognized
        component: ColorPickerInput(cardOptions),
      },
    },
    //@ts-expect-error – fields are not being recognized
    backgroundSchema,
  ],
};
