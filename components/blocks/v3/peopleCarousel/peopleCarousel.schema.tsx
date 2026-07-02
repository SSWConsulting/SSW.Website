import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";

export const V3PeopleCarouselSchema: Template = {
  name: "v3PeopleCarousel",
  label: "<V3> People Carousel",
  ui: {
    defaultItem: {
      heading: "We work together to form an amazing collective brain",
      subtitle: "We're enthusiastic and have a 'Make it happen' culture.",
      people: [
        {
          name: "Adam Cogan",
          role: "CEO + Chief Architect",
        },
        {
          name: "Gert Marx",
          role: "VIC State Manager + Solution Architect",
        },
        {
          name: "Penny Walker",
          role: "QLD State + International Manager",
        },
        {
          name: "Michael Smedley",
          role: "Head of Sales",
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
      type: "string",
      label: "Mobile + more Link",
      name: "mobilePlusMore",
      description:
        "Destination for the + more card at the end of the mobile carousel. Leave blank to hide it.",
    },
    {
      type: "object",
      label: "Buttons",
      name: "buttons",
      list: true,
      description: "A row of buttons. Max 2.",
      ui: {
        defaultItem: { buttonText: "Lorem Ipsum" },
        max: 2,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
    {
      type: "object",
      label: "People",
      name: "people",
      list: true,
      description: "The people shown in the carousel.",
      ui: {
        itemProps: (item) => ({ label: item?.name ?? "Person" }),
        defaultItem: {
          name: "New Person",
          role: "Role",
        },
      },
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Role",
          name: "role",
        },
        {
          type: "object",
          label: "Photo",
          name: "image",
          fields: [
            {
              type: "string",
              label: "Alt Text",
              name: "altText",
            },
            // @ts-expect-error – optimizedImageSchema's field types aren't recognised
            ...optimizedImageSchema(
              "Upload the person's photo. A square image works best."
            ),
          ],
        },
        {
          type: "string",
          label: "LinkedIn URL",
          name: "linkedin",
        },
        {
          type: "string",
          label: "X (Twitter) URL",
          name: "twitter",
        },
        {
          type: "string",
          label: "SSW People URL",
          name: "sswPeople",
        },
      ],
    },
  ],
};
