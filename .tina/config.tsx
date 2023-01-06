import { defineStaticConfig } from "tinacms";
import * as Schemas from "../components/blocks";

const config = defineStaticConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN!,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "images",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Global",
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
            ],
          },
          {
            type: "object",
            label: "Offices",
            name: "offices",
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
                required: true
              },
              {
                type: "string",
                name: "name",
                label: "Name",
                required: true
              },
              {
                type: "string",
                name: "streetAddress",
                label: "Street Address",
                required: true
              },
              {
                type: "string",
                name: "suburb",
                label: "Suburb"
              },
              {
                type: "string",
                name: "addressLocality",
                label: "Address Locality",
                required: true
              },
              {
                type: "string",
                name: "addressRegion",
                label: "Address Region",
                required: true
              },
              {
                type: "string",
                name: "addressCountry",
                label: "Address Country",
                required: true
              },
              {
                type: "string",
                name: "postalCode",
                label: "Post Code",
                required: true
              },
              {
                type: "string",
                name: "phone",
                label: "Phone",
                required: true
              },
              {
                type: "string",
                name: "hours",
                label: "Hours",
                required: true
              },
              {
                type: "string",
                name: "days",
                label: "Days",
                required: true
              }
            ]
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
                  { label: "TikTok", value: "tiktok" }
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
              {
                type: "string",
                label: "Text",
                name: "linkText",
              }
            ],
          }
        ],
      },
      {
        label: "Pages",
        name: "page",
        format: "mdx",
        path: "content/pages",
        ui: {
          router: ({ document }) => {
            if (document._sys.filename === "home") {
              return `/`;
            }
            return undefined;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            description: "Used for SEO description",
          },
          {
            type: "object",
            list: true,
            name: "beforeBody",
            label: "Before body",
            ui: {
              visualSelector: true,
            },
            templates: [
              ...Schemas.pageBlocks,
            ],
          },
          {
            type: "rich-text",
            label: "Body",
            name: "_body",
            templates: [
              ...Schemas.pageBlocks,
            ],
            isBody: true,
          },
          {
            type: "object",
            list: true,
            name: "sideBar",
            label: "Side Bar",
            ui: {
              visualSelector: true,
            },
            templates: [
              ...Schemas.pageBlocks,
            ],
          },
          {
            type: "object",
            list: true,
            name: "afterBody",
            label: "After body",
            ui: {
              visualSelector: true,
            },
            templates: [
              ...Schemas.pageBlocks,
            ],
          },
        ],
      },
      {
        label: "Consulting Pages",
        name: "consulting",
        format: "mdx",
        path: "content/consulting",
        ui: {
          router: ({ document }) => {
            return `/consulting/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            description: "Used for SEO description",
          },
          {
            type: "object",
            list: true,
            name: "beforeBody",
            label: "Before body",
            ui: {
              visualSelector: true,
            },
            templates: [
              ...Schemas.consultBlocks,
            ],
          },
          {
            type: "rich-text",
            label: "Body",
            name: "_body",
            templates: [
              ...Schemas.pageBlocks,
            ],
            isBody: true,
          },
          {
            type: "object",
            list: true,
            name: "afterBody",
            label: "After body",
            ui: {
              visualSelector: true,
            },
            templates: [
              ...Schemas.consultBlocks,
            ],
          },
        ],
      },
    ],
  },
});

export default config;
