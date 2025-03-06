import type { Collection, TinaField } from "tinacms";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jotFormSchema: TinaField = {
  type: "object",
  name: "jotForm",
  label: "JotForm Properties",
  fields: [
    {
      type: "string",
      name: "id",
      label: "Id",
      required: true,
    },
    {
      type: "string",
      name: "formTitle",
      label: "Form Title",
      required: true,
    },
    {
      type: "string",
      name: "backgroundColor",
      label: "Background Color",
      required: true,
    },
    {
      type: "string",
      name: "fontColor",
      label: "Font Color",
      required: true,
    },
    {
      type: "string",
      name: "formType",
      label: "Form Type",
      required: true,

      options: [
        {
          value: "0",
          label: "Form with Title",
        },
        {
          value: "1",
          label: "Form without Title and white border",
        },
        {
          value: "2",
          label: "Form without Title and black border",
        },
      ],
    },
    {
      type: "number",
      name: "height",
      label: "Height",
      required: true,
      description: "px",
    },
    {
      type: "number",
      name: "width",
      label: "Width",
      required: true,
      description: "px",
    },
  ],
};

export const globalSchema: Collection = {
  label: "Global - Sections",
  name: "global",
  path: "content/global",
  format: "json",
  ui: {
    global: true,
  },
  fields: [
    {
      type: "object",
      label: "Header",
      name: "header",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "Description",
          name: "description",
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Site Name",
          name: "site_name",
        },
        {
          type: "string",
          label: "Alternate Site Name",
          name: "alternate_site_name",
        },
      ],
    },
    {
      type: "string",
      label: "Youtube channel link",
      name: "youtubeChannelLink",
    },
    {
      type: "string",
      label: "Breadcrumb Suffix",
      name: "breadcrumbSuffix",
      description:
        "Note: this is only used for the legacy breadcrumb component",
    },
    {
      type: "object",
      label: "Breadcrumb Replacements",
      name: "breadcrumbReplacements",
      ui: {
        description:
          "Used to replace the URL segment in the breadcrumbs component with the 'to' field",
        itemProps(item) {
          return { label: `${item.from} ➡️ ${item.to}` };
        },
      },
      list: true,
      fields: [
        {
          name: "from",
          type: "string",
          label: "From",
          required: true,
        },
        {
          name: "to",
          type: "string",
          label: "To",
          required: true,
        },
      ],
    },
    {
      type: "string",
      description: "The display heading for the first breadcrumb route",
      label: "Breadcrumb Home Route",
      required: true,
      name: "breadcrumbHomeRoute",
    },
    {
      type: "string",
      label: "Booking Button Text",
      name: "bookingButtonText",
    },
    {
      type: "string",
      label: "Booking Phone No.",
      name: "bookingPhone",
    },
    {
      type: "image",
      label: "Default OG Image",
      name: "defaultOGImage",
    },
    {
      type: "object",
      label: "Home Page Office Index",
      name: "homePageOfficeList",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.addressLocality };
        },
      },
      fields: [
        {
          type: "string",
          name: "url",
          label: "Url",
          required: true,
        },
        {
          type: "string",
          name: "name",
          label: "Name",
          required: true,
        },
        {
          type: "string",
          name: "streetAddress",
          label: "Street Address",
          required: true,
        },
        {
          type: "string",
          name: "suburb",
          label: "Suburb",
        },
        {
          type: "string",
          name: "addressLocality",
          label: "Address Locality",
          required: true,
        },
        {
          type: "string",
          name: "addressRegion",
          label: "Address Region",
          required: true,
        },
        {
          type: "string",
          name: "addressCountry",
          label: "Address Country",
          required: true,
        },
        {
          type: "number",
          name: "postalCode",
          label: "Post Code",
          required: true,
        },
        {
          type: "string",
          name: "phone",
          label: "Phone",
          required: true,
        },
        {
          type: "string",
          name: "hours",
          label: "Hours",
          required: true,
        },
        {
          type: "string",
          name: "days",
          label: "Days",
          required: true,
        },
      ],
    },
    {
      type: "object",
      label: "Socials",
      name: "socials",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.type };
        },
      },
      fields: [
        {
          type: "string",
          label: "Type",
          name: "type",
          options: [
            { label: "Phone", value: "phone" },
            { label: "Facebook", value: "facebook" },
            { label: "Twitter", value: "twitter" },
            { label: "Instagram", value: "instagram" },
            { label: "LinkedIn", value: "linkedin" },
            { label: "Github", value: "github" },
            { label: "YouTube", value: "youtube" },
            { label: "TikTok", value: "tiktok" },
          ],
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Username",
          name: "username",
        },
      ],
    },
    {
      type: "object",
      label: "Contact Icon",
      name: "contactIcon",
      fields: [
        {
          type: "string",
          label: "URL",
          name: "url",
        },
        {
          type: "string",
          label: "Text",
          name: "linkText",
        },
        {
          type: "string",
          label: "Desktop Specific Link Text",
          name: "desktopSpecificLinkText",
        },
        {
          type: "string",
          label: "Desktop Specific URL",
          name: "desktopSpecificURL",
        },
        {
          type: "boolean",
          label: "Open in same Window",
          name: "openInSameWindow",
        },
      ],
    },
    {
      type: "object",
      label: "Clients",
      name: "clients",
      fields: [
        {
          type: "object",
          label: "Clients List",
          name: "clientsList",
          list: true,
          ui: {
            itemProps: (item) => {
              return { label: item?.clientName };
            },
          },
          fields: [
            {
              type: "string",
              label: "Client Name",
              name: "clientName",
            },
            {
              type: "string",
              label: "Image URL",
              name: "imageUrl",
              description:
                "The path of the image from the project root (most of the time, '/images/...')",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      label: "Forms",
      name: "forms",
      fields: [
        {
          type: "string",
          name: "bookingJotFormId",
          label: "Booking JotForm Id",
        },
        {
          type: "string",
          name: "newsletterJotFormId",
          label: "Newsletter JotForm Id",
        },
        {
          type: "string",
          name: "registrationOfInterestJotFormId",
          label: "Registration of Interest JotForm Id",
        },
      ],
    },
  ],
};
