import type { Template } from "tinacms";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

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
      type: "object",
      label: "Testimonials",
      name: "testimonials",
      list: true,
      description: "Each item is a slide in the testimonial carousel.",
      ui: {
        itemProps: (item) => ({ label: item?.authorName ?? "Testimonial" }),
        defaultItem: {
          quote:
            "**Lorem ipsum** dolor sit amet, consectetur adipiscing elit.",
          authorName: "Author Name",
          authorTitle: "Role, Company",
        },
      },
      fields: [
        {
          type: "string",
          label: "Quote",
          name: "quote",
          description: "Use **double asterisks** to highlight text in red.",
          ui: { component: "textarea" },
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
        },
        {
          type: "image",
          label: "Company Logo",
          name: "companyLogo",
        },
        {
          type: "string",
          label: "Company Logo Alt Text",
          name: "companyLogoAlt",
        },
      ],
    },
  ],
};
