import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3StackCardsSchema: Template = {
  name: "v3StackCards",
  label: "<V3> Stack Cards",
  ui: {
    defaultItem: {
      brow: "Full Stack Engineers",
      heading: "One team for the whole build",
      subtitle: "React is the front door. We build the whole house.",
      cards: [
        {
          title: "Next.js",
          description:
            "Fast, search-friendly web apps, with React under the hood.",
          link: "/",
        },
        {
          title: "React Native",
          description: "Mobile apps built with your favorite React stack.",
          link: "/",
        },
        {
          title: ".NET",
          description: "Enterprise backends that stand the test of time.",
          link: "/",
        },
        {
          title: "Azure",
          description:
            "Cloud infrastructure that keeps your app fast as it scales.",
          link: "/",
        },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    {
      type: "string",
      label: "Brow",
      name: "brow",
      description: "Small eyebrow text above the title.",
    },
    alternatingHeadingSchema,
    {
      type: "string",
      label: "Subtitle",
      name: "subtitle",
      description: "Short subtitle shown beneath the title.",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      label: "Cards",
      name: "cards",
      list: true,
      description: "Up to 4 stack cards shown in a row.",
      ui: {
        max: 4,
        itemProps: (item) => ({ label: item?.title ?? "Card" }),
        defaultItem: {
          title: "Next.js",
          description:
            "Fast, search-friendly web apps, with React under the hood.",
          link: "/",
        },
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "boolean",
          label: "Open in New Tab",
          name: "newTab",
        },
      ],
    },
  ],
};
