import React, { useEffect, useState } from "react";
import {
  ImageFieldPlugin,
  TextareaFieldPlugin,
  TextFieldPlugin,
  type Template,
} from "tinacms";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { blockLayout, LAYOUT } from "./testimonialsLayout";

// What the wrapper reads from the props Tina passes a field component. Tina
// passes its form at runtime, but its schema types leave it out, so `form`
// is optional here.
type CaseStudyFieldProps = {
  field: { name: string };
  form?: {
    getState: () => { values: object };
    subscribe: (
      listener: (state: { values: object }) => void,
      subscription: { values: true }
    ) => () => void;
  };
};

// The parts of a Tina field plugin (text, textarea, image) the wrapper uses.
type TinaFieldPlugin = {
  Component: React.ElementType;
  parse?: (value: string) => string;
};

// Shows Tina's own field only while the block uses the Quote & case study
// layout, so a case study can't be added to a Quote & portrait block. It
// follows the Layout field live, so switching layouts shows or hides it.
// Keeps the plugin's `parse`, so a cleared field still saves as "".
const caseStudyOnly = (plugin: TinaFieldPlugin) => ({
  parse: plugin.parse,
  component: function CaseStudyField(props: CaseStudyFieldProps) {
    const { form, field } = props;
    const [layout, setLayout] = useState(() =>
      blockLayout(field?.name, form?.getState().values ?? {})
    );
    useEffect(
      () =>
        form?.subscribe(
          ({ values }) => setLayout(blockLayout(field?.name, values)),
          { values: true }
        ),
      [form, field?.name]
    );
    return layout === LAYOUT.caseStudy ? <plugin.Component {...props} /> : null;
  },
});

const caseStudyText = caseStudyOnly(TextFieldPlugin);

export const V3TestimonialsSchema: Template = {
  name: "v3Testimonials",
  label: "<V3> Testimonials",
  ui: {
    defaultItem: {
      testimonials: [
        {
          quote:
            "SSW transformed our legacy systems. Their team delivered a **cutting-edge React app** that streamlined operations and enhanced citizen services.",
          authorName: "Alex Johnson",
          authorTitle: "CTO, GovTech Agency",
        },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    {
      type: "string",
      label: "Layout",
      name: "layout",
      description:
        "Quote & portrait: the quote with the author's photo. Quote & case study: a headline and the quote beside a case study card. The case study fields only show when Quote & case study is picked.",
      options: [
        { value: LAYOUT.quote, label: "Quote & portrait (default)" },
        { value: LAYOUT.caseStudy, label: "Quote & case study" },
      ],
    },
    {
      type: "object",
      label: "Testimonials",
      name: "testimonials",
      list: true,
      description:
        "Each testimonial is one slide. With two or more, visitors can move between them.",
      ui: {
        itemProps: (item) => ({ label: item?.authorName ?? "Testimonial" }),
        defaultItem: {
          quote: "**Lorem ipsum** dolor sit amet, consectetur adipiscing elit.",
          authorName: "Author Name",
          authorTitle: "Role, Company",
        },
      },
      fields: [
        {
          type: "string",
          label: "Quote",
          name: "quote",
          description:
            "Wrap words in **double asterisks** to show them in red. Don't type quotation marks; the design adds them.",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Case Study URL",
          name: "caseStudyUrl",
          description:
            "Where the case study card links to; it opens in a new tab. Use a relative path (e.g. /company/clients/fpe) or a full URL. Leave blank for no card.",
          ui: caseStudyText,
        },
        {
          type: "string",
          label: "Case Study Headline",
          name: "caseStudyHeadline",
          description:
            "Shown above the quote. Say what SSW delivered, e.g. 'An AI chatbot that answers payroll questions around the clock'.",
          ui: caseStudyText,
        },
        {
          type: "string",
          label: "Case Study Card Title",
          name: "caseStudyTitle",
          description: "Optional. Leave blank to use the Company Name.",
          ui: caseStudyText,
        },
        {
          type: "string",
          label: "Case Study Card Description",
          name: "caseStudyLabel",
          description:
            "One sentence under the card title, e.g. 'Discover how an AI-powered chatbot transformed their customer service.'",
          ui: caseStudyOnly(TextareaFieldPlugin),
        },
        {
          type: "image",
          label: "Case Study Card Photo",
          name: "caseStudyImage",
          description:
            "Optional. Shown at the top of the card, with the company logo over it. Leave blank for a card with no photo or logo.",
          ui: caseStudyOnly(ImageFieldPlugin),
        },
        {
          type: "string",
          label: "Case Study Card Photo Alt Text",
          name: "caseStudyImageAlt",
          description:
            "Describe the photo for screen readers. Leave blank if it's decorative.",
          ui: caseStudyText,
        },
        {
          type: "string",
          label: "Author Name",
          name: "authorName",
        },
        {
          type: "string",
          label: "Author Title",
          name: "authorTitle",
          description: "Role and company, e.g. CTO, GovTech Agency",
        },
        {
          type: "image",
          label: "Author Image",
          name: "authorImage",
          description:
            "Optional. The author's headshot; square photos work best.",
        },
        {
          type: "string",
          label: "Author Image Alt Text",
          name: "authorImageAlt",
          description:
            "Quote & portrait only. Describe the headshot for screen readers. Leave blank to use the author's name.",
        },
        {
          type: "image",
          label: "Company Logo",
          name: "companyLogo",
          description:
            "Quote & portrait: shown beside the author's name. Quote & case study: shown in white on the card photo.",
        },
        {
          type: "string",
          label: "Company Name",
          name: "companyLogoAlt",
          description:
            "Read out by screen readers for the logo. Quote & case study also uses it as the card title when that's blank, and to label the slide's dot.",
        },
      ],
    },
  ],
};
