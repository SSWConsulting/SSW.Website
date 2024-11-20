import { Template } from "tinacms";

export const BreadcrumbSchema: Template = {
  name: "breadcrumbs",
  label: "Breadcrumbs",
  ui: {
    previewSrc: "/images/thumbs/tina/client-logos.jpg",
  },
  // Todo: Find a way to have no fields - the one below is to satisfy compiler
  fields: [
    {
      type: "string",
      label: "Final Breadcrumb",
      name: "finalBreadcrumb",
    },
  ],
};
