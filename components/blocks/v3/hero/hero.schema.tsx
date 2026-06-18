import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";

export const V3HeroSchema: Template = {
  name: "v3Hero",
  label: "<V3> Hero",
  ui: {
    defaultItem: {
      background: {
        backgroundColour: 4,
        backgroundImage: "",
        bleed: false,
      },
      brow: "Lorem Ipsum",
      heading: "This is a **bold** headline",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      buttons: [{ buttonText: "Get Started", colour: 0 }],
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
      type: "rich-text",
      label: "Description",
      name: "description",
      description: "Main body text shown beneath the title.",
      toolbarOverride: ["bold", "italic", "link"],
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
      type: "string",
      label: "Media Type",
      name: "mediaType",
      description:
        "What to show on the right-hand side. 'Image' uses the Image field below; the other options render a built-in animated composition.",
      options: [
        { value: "image", label: "Image" },
        {
          value: "reactConsultingSvg",
          label: "React Consulting Atom (animated)",
        },
      ],
    },
    {
      type: "object",
      label: "Image",
      name: "image",
      description:
        "The image displayed on the right-hand side (only used when Media Type is 'Image').",
      fields: [
        ...optimizedImageSchema(
          "Upload the hero image. A landscape or square aspect ratio works best."
        ),
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description: "Alt text for the hero image.",
        },
      ],
    },
  ],
};
