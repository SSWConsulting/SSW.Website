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
          phone: "+61 7 3142 5400",
          address: "Brisbane, QLD, Australia",
          lat: -27.47,
          lng: 153.02,
        },
        {
          name: "Melbourne",
          email: "info@ssw.com.au",
          phone: "+61 3 8400 4500",
          address: "Melbourne, VIC, Australia",
          lat: -37.81,
          lng: 144.96,
        },
        {
          name: "Newcastle",
          email: "info@ssw.com.au",
          phone: "+61 2 4925 8200",
          address: "Newcastle, NSW, Australia",
          lat: -32.93,
          lng: 151.78,
        },
        {
          name: "Hangzhou, China",
          email: "info@ssw.com.au",
          phone: "+86 571 8765 4321",
          address: "Hangzhou, China",
          lat: 30.27,
          lng: 120.15,
        },
        {
          name: "Strasbourg, France",
          email: "info@ssw.com.au",
          phone: "+33 3 88 00 00 00",
          address: "Strasbourg, France",
          lat: 48.57,
          lng: 7.75,
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
