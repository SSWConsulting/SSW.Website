import { Template } from "tinacms";

export const serviceCards = {
  bigCardsLabel: "bigCardsLabel",
  bigCards: {
    value: "bigCards",
    title: "title",
    description: "description",
    color: "color",
    link: "link",
    imgSrc: "imgSrc",
  },
  smallCardsLabel: "smallCardsLabel",
  smallCards: {
    value: "smallCards",
    title: "title",
    link: "link",
    color: "color",
    imgSrc: "imgSrc",
    isExternal: "isExternal",
  },
  links: {
    value: "links",
    label: "label",
    link: "link",
  },
  backgroundColor: "backgroundColor",
};

export const serviceCardsBlockSchema: Template = {
  name: "ServiceCards",
  label: "Service Cards",
  ui: {
    previewSrc: "/images/thumbs/tina/services-cards.jpg",
  },
  fields: [
    {
      type: "string",
      label: "Big Cards Label",
      name: serviceCards.bigCardsLabel,
    },
    {
      label: "Big Cards",
      name: serviceCards.bigCards.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.title }),
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: serviceCards.bigCards.title,
        },
        {
          type: "string",
          label: "Description",
          // @ts-expect-error weird tina error
          component: "textarea",
          name: serviceCards.bigCards.description,
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.bigCards.link,
        },
        {
          type: "string",
          label: "Color",
          name: serviceCards.bigCards.color,
          options: [
            { label: "Red", value: "red" },
            { label: "Light Gray", value: "lightgray" },
            { label: "Medium Gray", value: "mediumgray" },
            { label: "Dark Gray", value: "darkgray" },
          ],
        },
        {
          type: "image",
          label: "Image",
          name: serviceCards.bigCards.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "service-cards",
        },
      ],
    },
    {
      type: "string",
      label: "Small Cards Label",
      name: serviceCards.smallCardsLabel,
    },
    {
      label: "Small Cards",
      name: serviceCards.smallCards.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.title }),
      },
      fields: [
        {
          type: "string",
          label: "Title",
          name: serviceCards.smallCards.title,
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.smallCards.link,
        },
        {
          type: "string",
          label: "Color",
          name: serviceCards.smallCards.color,
          options: [
            { label: "Red", value: "red" },
            { label: "Light Gray", value: "lightgray" },
            { label: "Medium Gray", value: "mediumgray" },
            { label: "Dark Gray", value: "darkgray" },
          ],
        },
        {
          type: "image",
          label: "Image",
          name: serviceCards.smallCards.imgSrc,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          uploadDir: () => "service-cards",
        },
        {
          type: "boolean",
          label: "External Page",
          description:
            "Select this if the link is not part of the website. This includes SSW.Rules, and SSW.People links",
          name: serviceCards.smallCards.isExternal,
        },
      ],
    },
    {
      label: "Links",
      name: serviceCards.links.value,
      type: "object",
      list: true,
      ui: {
        defaultItem: {},
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: serviceCards.links.label,
        },
        {
          type: "string",
          label: "URL",
          name: serviceCards.links.link,
        },
      ],
    },
    {
      type: "string",
      label: "Background Color",
      name: serviceCards.backgroundColor,
      options: [
        { label: "Default", value: "default" },
        { label: "Light Gray", value: "lightgray" },
        { label: "Red", value: "red" },
        { label: "Black", value: "black" },
      ],
    },
  ],
};
