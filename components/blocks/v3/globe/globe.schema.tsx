import type { Template } from "tinacms";
import alternatingHeadingSchema from "../../../blocksSubtemplates/alternatingHeading.schema";
import { buttonSchema } from "../../../button/templateButton.schema";
import { backgroundSchema } from "../../../layout/v2ComponentWrapper.schema";

export const V3GlobeSchema: Template = {
  name: "v3Globe",
  label: "<V3> Globe",
  ui: {
    defaultItem: {
      heading: "SSW around the globe",
      subtitle: "Partner with us, any time and any place.",
      buttons: [{ buttonText: "Schedule a Free Discovery Call", colour: 0 }],
      offices: [
        {
          name: "Sydney",
          email: "info@ssw.com.au",
          phone: "+61 2 9953 3000",
          address:
            "Level 1, 81-91 Military Road\nNeutral Bay, Sydney, NSW 2089, Australia",
          lat: -33.84,
          lng: 151.21,
        },
        {
          name: "Brisbane",
          email: "info@ssw.com.au",
          phone: "+61 7 3077 7081",
          address:
            "Level 1, 471 Adelaide Street\nBrisbane, QLD 4000, Australia",
          lat: -27.47,
          lng: 153.02,
        },
        {
          name: "Melbourne",
          email: "info@ssw.com.au",
          phone: "+61 3 9005 2034",
          address:
            "Level 1, 370 Little Bourke Street\nMelbourne, VIC 3000, Australia",
          lat: -37.81,
          lng: 144.96,
        },
        {
          name: "Newcastle",
          email: "info@ssw.com.au",
          phone: "+61 2 9953 3000",
          address: "432 Hunter St\nNewcastle, NSW 2300, Australia",
          lat: -32.93,
          lng: 151.78,
        },
        {
          name: "Hangzhou, China",
          email: "info@ssw.com.au",
          phone: "+86 571 8517 8910",
          address:
            "Room 305, Building 2, Xingcheng Development Building, No. 406 Xintiandi Street\nHangzhou, China, Zheijang Province 310004, China",
          lat: 30.27,
          lng: 120.15,
        },
        {
          name: "Strasbourg, France",
          email: "info@ssw.com.au",
          phone: "+33 3 67 39 05 39",
          address:
            "Level 4–19 Rue du Fossé des Treize\nStrasbourg, France, Strasbourg 67000, France",
          lat: 48.57,
          lng: 7.75,
        },
        {
          name: "North America",
          email: "hello@ssw.com",
          phone: "+1 302 520 3805",
          address: "Online Only\nNorth America, DE 2111, USA",
          lat: 49.28,
          lng: -123.12,
        },
      ],
    },
  },
  fields: [
    //@ts-expect-error – custom component typing won't be pinned down
    backgroundSchema,
    alternatingHeadingSchema,
    {
      type: "string",
      label: "Subtitle",
      name: "subtitle",
      description: "Short line beneath the heading.",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      label: "Button",
      name: "buttons",
      list: true,
      description: "Call-to-action. Max 1.",
      ui: {
        max: 1,
        itemProps: (item) => ({ label: item?.buttonText ?? "Button" }),
        defaultItem: { buttonText: "Schedule a Free Discovery Call" },
      },
      //@ts-expect-error – fields are not being recognized
      fields: buttonSchema,
    },
    {
      type: "object",
      label: "Offices",
      name: "offices",
      list: true,
      description: "Offices shown in the accordion and pinned on the map.",
      ui: {
        itemProps: (item) => ({ label: item?.name ?? "Office" }),
        defaultItem: {
          name: "New Office",
          email: "info@ssw.com.au",
          lat: 0,
          lng: 0,
        },
      },
      fields: [
        { type: "string", label: "Name", name: "name" },
        { type: "string", label: "Email", name: "email" },
        { type: "string", label: "Phone", name: "phone" },
        {
          type: "string",
          label: "Address",
          name: "address",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          label: "Site Link Text",
          name: "siteLinkText",
          description:
            "Label for the office's site link shown in the dropdown, e.g. 'Visit our Sydney page'.",
        },
        {
          type: "string",
          label: "Site Link URL",
          name: "siteLinkUrl",
          description: "Where the site link points to.",
        },
        {
          type: "number",
          label: "Latitude",
          name: "lat",
          description: "Map pin latitude.",
        },
        {
          type: "number",
          label: "Longitude",
          name: "lng",
          description: "Map pin longitude.",
        },
      ],
    },
  ],
};
