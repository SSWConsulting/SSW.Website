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
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [
      {
        label: "Blog Posts",
        name: "post",
        path: "content/posts",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/posts/${document._sys.filename}`;
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
            type: "image",
            name: "heroImg",
            label: "Hero Image",
          },
          {
            type: "rich-text",
            label: "Excerpt",
            name: "excerpt",
          },
          {
            type: "datetime",
            label: "Posted Date",
            name: "date",
            ui: {
              dateFormat: "MMMM DD YYYY",
              timeFormat: "hh:mm A",
            },
          },
          {
            type: "rich-text",
            label: "Body",
            name: "_body",
            templates: [
              {
                name: "DateTime",
                label: "Date & Time",
                inline: true,
                fields: [
                  {
                    name: "format",
                    label: "Format",
                    type: "string",
                    options: ["utc", "iso", "local"],
                  },
                ],
              },
              {
                name: "BlockQuote",
                label: "Block Quote",
                fields: [
                  {
                    name: "children",
                    label: "Quote",
                    type: "rich-text",
                  },
                  {
                    name: "authorName",
                    label: "Author",
                    type: "string",
                  },
                ],
              },
              {
                name: "NewsletterSignup",
                label: "Newsletter Sign Up",
                fields: [
                  {
                    name: "children",
                    label: "CTA",
                    type: "rich-text",
                  },
                  {
                    name: "placeholder",
                    label: "Placeholder",
                    type: "string",
                  },
                  {
                    name: "buttonText",
                    label: "Button Text",
                    type: "string",
                  },
                  {
                    name: "disclaimer",
                    label: "Disclaimer",
                    type: "rich-text",
                  },
                ],
                ui: {
                  defaultItem: {
                    placeholder: "Enter your email",
                    buttonText: "Notify Me",
                  },
                },
              },
            ],
            isBody: true,
          },
        ],
      },
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
            label: "Socials",
            name: "socials",
            list: true,
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
    ],
  },
});

export default config;
