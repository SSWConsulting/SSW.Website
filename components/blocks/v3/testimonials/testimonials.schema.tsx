import React, { useEffect, useState } from "react";
import {
  ImageFieldPlugin,
  TextareaFieldPlugin,
  TextFieldPlugin,
  type Template,
} from "tinacms";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";
import { blockLayout, LAYOUT } from "./testimonialsLayout";

// Shows Tina's own field only while the block uses the Quote & case study
// layout, so a case study can't be added to a Quote & portrait block. It
// follows the Layout field live, so switching layouts shows or hides it.
// Keeps the plugin's `parse`, so a cleared field still saves as "".
const caseStudyOnly = (plugin) => ({
  parse: plugin.parse,
  component: function CaseStudyField(props) {
    const { form, field } = props;
    const [layout, setLayout] = useState(() =>
      blockLayout(field?.name, form.getState().values)
    );
    useEffect(
      () =>
        form.subscribe(
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
        "Quote & portrait shows the author's photo beside the quote, with no case study. Quote & case study shows each slide as a case study: a headline, the quote and its author, and a case study card (photo, title and sentence) on slides that have a Case Study URL. The case study fields only appear in this layout.",
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
      description: "Each item is a slide in the testimonial carousel.",
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
            "Use **double asterisks** to highlight text in red. Leave the quotation marks out — the design adds them.",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Case Study URL",
          name: "caseStudyUrl",
          description:
            "Shows the case study card, which links here. Without it, the slide has no card.",
          ui: caseStudyText,
        },
        {
          type: "string",
          label: "Case Study Headline",
          name: "caseStudyHeadline",
          description:
            "Headline above the quote, e.g. 'An AI chatbot that answers payroll questions around the clock'.",
          ui: caseStudyText,
        },
        {
          type: "string",
          label: "Case Study Card Title",
          name: "caseStudyTitle",
          description:
            "Title on the case study card. Defaults to the Company Logo Alt Text.",
          ui: caseStudyText,
        },
        {
          type: "string",
          label: "Case Study Sentence",
          name: "caseStudyLabel",
          description:
            "Short description on the case study card, under its title, e.g. 'Discover how an AI-powered chatbot transformed their customer service.'",
          ui: caseStudyOnly(TextareaFieldPlugin),
        },
        {
          type: "image",
          label: "Case Study Card Photo",
          name: "caseStudyImage",
          description:
            "Photo at the top of the case study card, with the company logo over it. Without a photo, the card shows no image or logo.",
          ui: caseStudyOnly(ImageFieldPlugin),
        },
        {
          type: "string",
          label: "Case Study Card Photo Alt Text",
          name: "caseStudyImageAlt",
          description: "Leave empty if the photo is decorative.",
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
          description: "e.g. CTO, GovTech Agency",
        },
        {
          type: "image",
          label: "Author Image",
          name: "authorImage",
          description: "Headshot of the author.",
        },
        {
          type: "string",
          label: "Author Image Alt Text",
          name: "authorImageAlt",
          description:
            "Quote & portrait layout only. The case study layout shows the headshot beside the author's name, so it needs none.",
        },
        {
          type: "image",
          label: "Company Logo",
          name: "companyLogo",
          description:
            "Quote & portrait: shown beside the author. Quote & case study: shown in white on the case study card's photo.",
        },
        {
          type: "string",
          label: "Company Logo Alt Text",
          name: "companyLogoAlt",
          description:
            "The company's name. Quote & case study: also the card title when Case Study Card Title is empty, and the label of the slide's dot.",
        },
      ],
    },
  ],
};
