import type { Collection } from "tinacms";

import * as Schemas from "../../components/blocks";
import { sswCountries } from "../../components/util/constants/country";
import { seoSchema } from "../../components/util/seo";
import { kebabCaseFilename } from "./shared-fields";

export const officeIndexSchema: Collection = {
  label: "Offices - Index",
  name: "officeIndex",
  path: "content/office/index",
  format: "json",
  ui: {
    allowedActions: {
      create: false,
      delete: false,
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "object",
      label: "Offices Index Page",
      name: "officesIndex",
      list: true,
      ui: {
        itemProps: (item) => {
          const label = "Office";

          if (!item || !item.office) {
            return { label };
          }

          const path = item.office;
          const pathComponents = path.split("/");
          const fileName = pathComponents[pathComponents.length - 1];
          const cityName = fileName.split(".")[0];
          const cityNameCapitalized =
            cityName.charAt(0).toUpperCase() + cityName.slice(1);

          return {
            label: cityNameCapitalized,
          };
        },
      },
      fields: [
        {
          type: "reference",
          label: "Office",
          name: "office",
          collections: ["offices"],
          required: true,
        },
      ],
    },
  ],
};

export const officeSchema: Collection = {
  label: "Offices - Pages",
  name: "offices",
  format: "mdx",
  path: "content/offices",
  ui: {
    ...kebabCaseFilename,
    router: ({ document }) => {
      return `/offices/${document._sys.filename}`;
    },
  },
  fields: [
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    seoSchema,
    {
      type: "image",
      label: "Cover Image",
      name: "coverImg",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: (args) => `/offices/${args.addressLocality}`,
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: () => "offices/thumbnails",
    },
    {
      type: "image",
      label: "Sidebar Image",
      name: "sideImg",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: (args) => {
        return `/offices/${args.addressLocality}`;
      },
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
      required: true,
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
      options: sswCountries.map((country) => country.label),
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
      label: "Chapel Link",
      name: "chapelLink",
      required: false,
    },
    {
      type: "string",
      name: "hours",
      label: "Hours",
    },
    {
      type: "string",
      name: "days",
      label: "Days",
    },
    {
      type: "object",
      name: "sidebarSecondaryPlace",
      label: "Sidebar secondary place URL",
      fields: [
        {
          type: "string",
          name: "name",
          label: "Name",
        },
        {
          type: "string",
          name: "url",
          label: "URL",
        },
      ],
    },
    {
      type: "rich-text",
      label: "About Us",
      name: "aboutUs",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "object",
      name: "localWebsiteLink",
      label: "Local Website Link",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
        },
        {
          type: "string",
          name: "url",
          label: "Url",
        },
      ],
    },
    {
      type: "image",
      label: "Map Image",
      name: "map",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      uploadDir: (args) => `/offices/${args.addressLocality}`,
    },
    {
      type: "string",
      label: "Directions URL",
      name: "directionsUrl",
    },
    {
      type: "rich-text",
      label: "Directions",
      name: "directions",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Parking",
      name: "parking",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Public Transport",
      name: "publicTransport",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Team",
      name: "team",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Photos",
      name: "photos",
      templates: [...Schemas.pageBlocks],
    },
    {
      type: "rich-text",
      label: "Body",
      name: "_body",
      templates: [...Schemas.pageBlocks],
      isBody: true,
    },
  ],
};
