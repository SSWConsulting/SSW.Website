import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { backgroundOptions } from "../../../blocksSubtemplates/tinaFormElements/colourOptions/blockBackgroundOptions";
import { ColorPickerInput } from "../../../blocksSubtemplates/tinaFormElements/colourSelector";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";

export const V3ImageCardsSchema: Template = {
  name: "v3ImageCards",
  label: "<V3> Image Cards",
  ui: {
    defaultItem: {
      heading: "Australia's leading AI, .NET and Cloud consultants",
      subtitle: "Tell us about your platform. We'll show you what's possible.",
      showBorder: true,
      cards: [
        {
          title: "Web Development",
          description:
            "Ever since SSW developed the very first .NET Website in Australia, we've been known as leaders in Web Development.",
          link: "/",
        },
        {
          title: "Artificial Intelligence",
          description:
            "Custom AI solutions using LLMs (ChatGPT, Llama, Gemini, Claude, etc) and Azure AI to revolutionize your business.",
          link: "/",
        },
        {
          title: "DevOps & Cloud",
          description:
            "Make sure your software ships by using SSW's best practices in Azure, DevOps and Docker Containers.",
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
    // @ts-expect-error – number field uses a custom ColorPickerInput component
    {
      type: "number",
      label: "Card Background Colour",
      name: "cardBackgroundColour",
      description: "Background colour for the body of each card.",
      ui: {
        component: ColorPickerInput(backgroundOptions),
      },
    },
    {
      type: "boolean",
      label: "Card Border",
      name: "showBorder",
      description: "Show a border around each card.",
    },
    {
      type: "object",
      label: "Cards",
      name: "cards",
      list: true,
      description: "Cards shown in a row, each with a graphic on a red panel.",
      ui: {
        itemProps: (item) => ({ label: item?.title ?? "Card" }),
        defaultItem: {
          title: "Web Development",
          description:
            "Ever since SSW developed the very first .NET Website in Australia, we've been known as leaders in Web Development.",
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
          type: "object",
          label: "Graphic",
          name: "graphic",
          description:
            "The graphic shown centered on the red panel at the top of the card.",
          fields: [
            {
              type: "string",
              label: "Alt Text",
              name: "altText",
              description: "Alt text for the card graphic.",
            },
            // @ts-expect-error – optimizedImageSchema's field types aren't recognised
            ...optimizedImageSchema(
              "Upload the card graphic. A square, transparent PNG works best."
            ),
          ],
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
