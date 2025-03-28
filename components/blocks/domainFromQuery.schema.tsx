import { Template } from "tinacms";

export const domainFromQuerySchema: Template = {
  name: "DomainFromQuery",
  label: "Domain from query",
  ui: {
    previewSrc: "/images/thumbs/tina/domain-from-query.jpg",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
      description: "This is a H1 heading",
    },
    {
      name: "showDomain",
      label: "Show domain name",
      type: "boolean",
      description: "Query param in URL must have key of 'domain'",
    },
  ],
};
