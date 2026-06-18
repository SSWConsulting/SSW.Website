import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3StatisticsTemplate: Template = {
  name: "v3Statistics",
  label: "<V3> Statistics",
  ui: {
    defaultItem: {
      heading: "Why teams choose **SSW**",
      statistics: [
        {
          figure: 1000,
          figureSuffix: "+",
          heading: "Solutions delivered",
          description: "Enterprise-grade software",
        },
        {
          figure: 1000,
          figureSuffix: "+",
          heading: "Happy clients",
          description: "Across all industries",
        },
        {
          figure: 30,
          figureSuffix: "+",
          heading: "Years experience",
          description: "Trusted since 1999",
        },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    {
      type: "object",
      label: "Statistics",
      name: "statistics",
      list: true,
      description:
        "Blocks for statistics - maximum of 3",
      ui: {
        max: 3,
        itemProps: (item) => ({ label: item?.heading ?? "Statistic" }),
        defaultItem: {
          figure: 100,
          figureSuffix: "+",
          heading: "Statistic",
          description: "Short supporting line",
        },
      },
      fields: [
        {
          type: "number",
          label: "Figure",
          name: "figure",
        },
        {
          type: "string",
          label: "Figure Suffix",
          name: "figureSuffix",
        },
        {
          type: "string",
          label: "Title",
          name: "heading",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
      ],
    },
  ],
};
