import { Template } from "tinacms";

export const BreadcrumbSchema: Template = {
  name: "breadcrumbs",
  label: "Breadcrumbs",
  ui: {
    previewSrc: "/images/thumbs/tina/client-logos.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Final Breadcrumb",
      name: "finalBreadcrumb",
      description: "The final breadcrumb in the list",
    },
  ],
};
