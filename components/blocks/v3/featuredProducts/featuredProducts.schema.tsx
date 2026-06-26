import type { Template, TinaField } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { optimizedImageSchema } from "../../../../tina/collections/shared-fields";

const imageField = (name: string, label: string, description: string): TinaField => ({
  type: "object",
  label,
  name,
  fields: [
    {
      type: "string",
      label: "Alt Text",
      name: "altText",
    },
    // @ts-expect-error – optimizedImageSchema's field types aren't recognised
    ...optimizedImageSchema(description),
  ],
});

// Shared title/description/link/image used by the highlight and the cards.
const productFields: TinaField[] = [
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
  imageField("image", "Image", "Upload the project image."),
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
];

export const V3FeaturedProductsSchema: Template = {
  name: "v3FeaturedProducts",
  label: "<V3> Featured Products",
  ui: {
    defaultItem: {
      heading: "Featured Projects",
      subtitle:
        "SSW's Consulting Services have delivered best-in-class Microsoft solutions for thousands of clients in 15 countries over more than 30 years.",
      buttons: [{ buttonText: "Our Client Stories", colour: 0 }],
      highlighted: {
        title: "AI Powered Navigation for French Payroll Expert",
        description:
          "French Payroll Expert (FPE) faced a high volume of inquiries from their clients about French legislation. The time spent responding to these time-consuming emails was a resource our client knew they could save, especially with the emergence of artificial intelligence.",
        link: "/",
      },
      products: [
        {
          title: "Improving Radiologists' Ability to Detect Breast Cancer",
          description: "Improving radiologists' ability to detect breast cancer",
          link: "/",
        },
        {
          title: "Helping Deaf Children reach their full potential",
          description: "Developing web apps for clinical assessment of deaf children",
          link: "/",
        },
        {
          title: "How We Developed 'KNOWnoise' with Hutchison Weller",
          description: "Managing construction noise with the new web app",
          link: "/",
        },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    {
      type: "string",
      label: "Subtitle",
      name: "subtitle",
      description: "Paragraph shown on the right of the header.",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      label: "Header Button",
      name: "buttons",
      list: true,
      description: "Header call-to-action. Max 1.",
      ui: {
        max: 1,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
        defaultItem: { buttonText: "Our Client Stories" },
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
    {
      type: "object",
      label: "Highlighted Project",
      name: "highlighted",
      description: "The single large project shown at the top.",
      fields: [
        imageField(
          "logo",
          "Logo",
          "Optional round logo shown above the title."
        ),
        ...productFields,
      ],
    },
    {
      type: "object",
      label: "Other Featured Projects",
      name: "products",
      list: true,
      description: "Up to 3 projects shown in a row beneath the highlight.",
      ui: {
        max: 3,
        itemProps: (item) => ({ label: item?.title ?? "Project" }),
        defaultItem: {
          title: "Featured Project",
          description: "A short blurb about this featured project.",
          link: "/",
        },
      },
      fields: productFields,
    },
  ],
};
